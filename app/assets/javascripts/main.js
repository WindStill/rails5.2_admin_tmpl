//解决turbolinks与Adminlte一起的用的时候页面不撑满的问题
document.addEventListener('turbolinks:load', function () {
  $(window).trigger('resize');
  $('.sidebar-menu').tree();

  $('.alert').delay(2000).slideUp(500);
});

$(document).on('click', 'a.action-confirm', function(event) {
  if ($(this).is('[disabled=disabled]'))
    return false
  tiptext = $(this).text();
  if ($(this).data('tiptext') != undefined)
    tiptext = $(this).data('tiptext');
  $('#modal-tips .modal-body').text('确认' + tiptext + '?');

  method = 'delete';
  if ($(this).data('amethod') != undefined)
    method = $(this).data('amethod');
  footer = '<button class="btn btn-default btn-sm" type="button" data-dismiss="modal">取消</button>\
            <a href="'+$(this).attr('href')+'" class="btn btn-primary btn-sm" data-remote="true" data-method="' + method + '" data-disable-with="提交中">确定</a>';
  $('#modal-tips .modal-footer').html(footer);
  $('#modal-tips').modal('show');
  return false
});

//处理模态框
$(document).on('hide.bs.modal', '#modal-tips', resetModalTips);
$(document).on('hidden.bs.modal', '#modal-tips', function() {
  //解决表单弹窗再次弹窗后，原有表单弹窗不能滚动的问题
  if ($('.business.modal').css('display') == 'block')
    $('body').addClass('modal-open')
});
$(document).on('show.bs.modal', '.modal', centerModal);
$(window).on("resize", function() { $('.modal:visible').each(centerModal); });

function resetModalTips() {
  $('#modal-tips .modal-body').text('');
  $('#modal-tips .modal-footer').html('<button class="btn btn-default btn-sm" type="button" data-dismiss="modal">关闭</button>');
}

function centerModal() {
  var $dialog  = $(this).find(".modal-dialog");
  if (!$(this).hasClass('image-modal')) {
    $(this).css('display', 'block');
    offset       = ($(window).height() - $dialog.height()) / 2;
    bottomMargin = parseInt($dialog.css('marginBottom'), 10);

    // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
    if(offset < bottomMargin) offset = bottomMargin;
    $dialog.css("margin-top", offset);
  } else {
    $dialog.css("margin-top", '5%');
  }
}