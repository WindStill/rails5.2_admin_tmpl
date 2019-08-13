//解决turbolinks与Adminlte一起的用的时候页面不撑满的问题
document.addEventListener('turbolinks:load', function () {
  $(window).trigger('resize');
  $('.sidebar-menu').tree();

  $('.alert').delay(2000).slideUp(500);
});