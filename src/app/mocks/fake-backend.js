// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let publications = JSON.parse(localStorage.getItem('publications')) || [];
let reactions = JSON.parse(localStorage.getItem('reactions')) || [];
let comments = JSON.parse(localStorage.getItem('comments')) || [];
    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                var resolved = false;
                
                if(!resolved) resolved = userMock(url,opts,resolve,reject);
                if(!resolved) resolved = publicationMock(url,opts,resolve,reject);
                if(!resolved) resolved = commentMock(url,opts,resolve,reject);
                if(!resolved) resolved = reactionMock(url,opts,resolve,reject);

                // pass through any requests not handled above
                if(!resolved) realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }

    function reactionMock(url,opts,resolve,reject){
        function getOldId(){
            return reactions.length ? Math.max(...reactions.map(comment => comment.id)) + 1 : 1;
        }
        function findUserReactionIndex(user_id, publication_id){
            return reactions.findIndex(v => ( v.user_id === user_id && v.publication_id === publication_id ));
        }

        if (url.endsWith('/reactions/add') && opts.method === 'POST') {
            let newReaction = JSON.parse(opts.body);

            // find if user has make reaction before
            let oldReactionIndex = findUserReactionIndex(newReaction.user_id,newReaction.publication_id);
            if(oldReactionIndex !== -1){
                if(newReaction.type !== reactions[oldReactionIndex].type){
                    // if reaction is not equal update type
                    newReaction.updated_at = new Date();
                    reactions[oldReactionIndex] = Object.assign({},reactions[oldReactionIndex],newReaction);
                    localStorage.setItem('reactions', JSON.stringify(reactions));
                }else{
                    // if reaction is equal then delete reaction
                    reactions.splice(oldReactionIndex,1);
                    localStorage.setItem('reactions', JSON.stringify(reactions));
                }
            }else{
                // add reaction to store
                newReaction.id = getOldId();
                newReaction.created_at = new Date();
                reactions.push(newReaction);
                localStorage.setItem('reactions', JSON.stringify(reactions));
            }

            let filterReactions = reactions.filter(v => v.publication_id === newReaction.publication_id);

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve( JSON.stringify(filterReactions)) });
            return true;
        }
    }

    function commentMock(url,opts,resolve,reject){
        function getOldId(){
            return comments.length ? Math.max(...comments.map(comment => comment.id)) + 1 : 1;
        }
        function findUserRel(p){
            return users[users.findIndex(e => e.id === p.user_id)]
        }

        if (url.endsWith('/comments/add') && opts.method === 'POST') {
            let newComment = JSON.parse(opts.body);

            // store Comment
            newComment.id = getOldId();
            newComment.user = findUserRel(newComment);
            newComment.created_at = new Date();
            comments.push(newComment);
            localStorage.setItem('comments', JSON.stringify(comments));

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(newComment)) });
            return true;
        }
    }

    function publicationMock(url,opts,resolve,reject){
        function getOldId(){
            return publications.length ? Math.max(...publications.map(publication => publication.id)) + 1 : 1;
        }
        function findUserRel(p){
            return users[users.findIndex(e => e.id === p.user_id)]
        }
        function findCommentsRel(p) {
            return comments.filter((c) => c.publication_id === p.id).map(c => Object.assign(c,{user: findUserRel(c)}));
        }
        function findReactionsRel(p) {
            return reactions.filter((c) => c.publication_id === p.id).map(r => Object.assign(r,{user: findUserRel(r)}));
        }

        if (url.endsWith('/publications') && opts.method === 'GET') {
            // response with all publications on local storage
            // respond 200 OK
            let publicationsResponse = publications.map(((p)=> {
                return Object.assign({},p,{
                    user: findUserRel(p),
                    comments: findCommentsRel(p),
                    reactions: findReactionsRel(p)
                })
            }))
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(publicationsResponse)) });
            return true;
        }

        if (url.endsWith('/publications/add') && opts.method === 'POST') {
            // get publication from post request
            let newPublication = JSON.parse(opts.body);

            // store publication
            newPublication.id = getOldId();
            newPublication.created_at = new Date();
            newPublication.user = findUserRel(newPublication);
            newPublication.comments = findCommentsRel(newPublication);
            newPublication.reactions = findReactionsRel(newPublication);
            publications.push(newPublication);
            localStorage.setItem('publications', JSON.stringify(publications));

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(newPublication)) });
            return true;
        }        
    }

    function userMock(url,opts,resolve,reject) {
        // authenticate
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
            // get parameters from post request
            let params = JSON.parse(opts.body);

            // find if any user matches login credentials
            let filteredUsers = users.filter(user => {
                return user.username === params.username && user.password === params.password;
            });

            if (filteredUsers.length) {
                // if login details are valid return user details and fake jwt token
                let user = filteredUsers[0];
                let responseJson = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                };
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
            } else {
                // else return error
                reject('Username or password is incorrect');
            }

            return true;
        }

        // get users
        if (url.endsWith('/users') && opts.method === 'GET') {
            // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
            if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
            } else {
                // return 401 not authorised if token is null or invalid
                reject('Unauthorised');
            }

            return true;
        }

        // get user by id
        if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
            // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                // find user by id in users array
                let urlParts = url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let matchedUsers = users.filter(user => { return user.id === id; });
                let user = matchedUsers.length ? matchedUsers[0] : null;

                // respond 200 OK with user
                resolve({ ok: true, text: () => JSON.stringify(user)});
            } else {
                // return 401 not authorised if token is null or invalid
                reject('Unauthorised');
            }

            return true;
        }

        // register user
        if (url.endsWith('/users/register') && opts.method === 'POST') {
            // get new user object from post body
            let newUser = JSON.parse(opts.body);

            // validation
            let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
            if (duplicateUser) {
                reject('Username "' + newUser.username + '" is already taken');
                return;
            }

            // save new user
            newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });

            return true;
        }

        // delete user
        if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
            // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                // find user by id in users array
                let urlParts = url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < users.length; i++) {
                    let user = users[i];
                    if (user.id === id) {
                        // delete user
                        users.splice(i, 1);
                        localStorage.setItem('users', JSON.stringify(users));
                        break;
                    }
                }

                // respond 200 OK
                resolve({ ok: true, text: () => Promise.resolve() });
            } else {
                // return 401 not authorised if token is null or invalid
                reject('Unauthorised');
            }

            return true;
        }
    }
}