export function commentsFormat(count){
    if(count === 0){
        return "Sin comentarios";
    }else if(count === 1){
        return "Un comentario";
    }else if(count >= 1){
        return count + " comentarios";
    }
}

export function formatDateToNow(oldDate){
    var seconds = Math.floor( Math.abs((new Date() - (new Date(oldDate))) )/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);
    if(days > 0){
        if(days === 1){
            return "Hace un día";
        }else{
            return "Hace "+days+" días";
        }
    }else if(hours > 0){
        if(hours === 1){
            return "Hace un hora";
        }else{
            return "Hace "+hours+" horas";
        }
    }else if(minutes > 0){
        if(minutes === 1){
            return "Hace un minuto";
        }else{
            return "Hace "+minutes+" minutos";
        }
    }else if(seconds > 0){
        if(seconds === 1){
            return "Hace un segundo";
        }else{
            return "Hace "+seconds+" segundos";
        }
    }
    return "Hace un instante";
}