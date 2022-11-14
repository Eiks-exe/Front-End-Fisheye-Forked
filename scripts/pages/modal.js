document.getElementById('contact_button').addEventListener('click', ()=> {
   const modal = document.getElementById('contact_modal')
   modal.style.display = 'block'
})

document.getElementById('close').addEventListener('click', ()=>{
   document.getElementById('contact_modal').style.display = 'none'
})