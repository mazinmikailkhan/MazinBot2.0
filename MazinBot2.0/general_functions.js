function chatPromptFocus(a, reverse){
    let element = document.getElementById(a);
    if (!reverse){
        element.style.display = 'block';
        element.style.animation = 'textfocus 0.3s linear';
        element.style.animationFillMode = 'forwards';
        //console.log("In focus");
    }else{
        element.style.display = "none";
    }
}
function writeChat(text, targetObject){
    let htmlCode = `<div class="mymessage">
                        <span class="message">${text}</span>
                    </div>`;
    targetObject.innerHTML += htmlCode;
}