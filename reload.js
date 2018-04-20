document.onFocus = ()=>{if(reload){
  reload = false;
  location.reload();
}};

document.onBlur = ()=>{reload = true};
