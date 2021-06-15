//---------------CRIAÇÃO DO BOTAO QUE REDIRECIONA PARA O TOPO DA PAGINA-----------
//PEGANDO O ELEMENTO DO HTML
let $button = document.querySelector('#backToTop')

//ADICIONANDO O EVENTO DO CLIQUE NO BOTAO
$button.addEventListener('click', function(){
    smoothScrollTo(0, 0)
})




//-----------------CRIANDO A SUAVIZAÇÃO DE SCROLL DA PAGINA-----------------
//PEGANDO OS ELEMENTOS DO HTML
const $menuItens = document.querySelectorAll('.navbar a')

//FUNÇÃO DE EVENTO AO CLIQUE DE CADA SEÇÃO
$menuItens.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick)
})

//ADICIONANDO A MOVIMENTAÇÃO PARA A SECTION SELECIONADA
function scrollToIdOnClick(event){
    event.preventDefault()
    const to = getScrollTopByHref(event.currentTarget)
    scrollToPosition(to)
}

//PEGAR O ELEMENTO PELO HREF
function getScrollTopByHref(element){
    const id = element.getAttribute('href')
    return document.querySelector(id).offsetTop
}


//MOMENTO DO SCROLL PARA A POSIÇÃO DO ELEMENTO
function scrollToPosition(to){
    //MODO NATIVO CASO FUNCIONE NO BROWSER
    // window.scroll({
        //     top: to,
        //     behavior: "smooth",
        // })
        smoothScrollTo(0, to)
}




//-----------------FUNÇÃO PARA SUAVIZAÇÃO DO SCROLL---------------------
// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/*
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};