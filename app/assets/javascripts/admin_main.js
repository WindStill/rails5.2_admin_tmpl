document.addEventListener('turbolinks:load', function () {
  //解决turbolinks与Adminlte一起的用的时候页面不撑满的问题
  $(window).trigger('resize');

  //解决sidebar子菜单不展开的问题
  $('.sidebar-menu').tree();

  $('.alert').delay(2000).slideUp(500);
});

$(document).on('click', 'a.action-confirm', function(event) {
  if ($(this).is('[disabled=disabled]'))
    return false
  tiptext = $(this).text();
  if ($(this).data('tiptext') != undefined)
    tiptext = $(this).data('tiptext');
  $('#modalTip .modal-body').text('确认' + tiptext + '?');

  method = 'delete';
  if ($(this).data('amethod') != undefined)
    method = $(this).data('amethod');
  footer = '<button class="btn btn-default btn-sm" type="button" data-dismiss="modal">取消</button>\
            <a href="'+$(this).attr('href')+'" class="btn btn-primary btn-sm" data-remote="true" data-method="' + method + '" data-disable-with="提交中">确定</a>';
  $('#modalTip .modal-footer').html(footer);
  $('#modalTip').modal('show');
  return false
});

$(document).on('click', '.show-img', function() {
  $('#modalImg .modal-body img').attr('src', $(this).data('img-url'));
  $('#modalImg').modal('show');
});

//处理模态框
$(document).on('hide.bs.modal', '#modalTip', resetModalTip);
$(document).on('hidden.bs.modal', '#modalTip', function() {
  //解决表单弹窗再次弹窗后，原有表单弹窗不能滚动的问题
  if ($('.business.modal').css('display') == 'block')
    $('body').addClass('modal-open')
});
$(document).on('show.bs.modal', '.modal', centerModal);
$(window).on("resize", function() { $('.modal:visible').each(centerModal); });

function resetModalTip() {
  $('#modalTip .modal-body').text('');
  $('#modalTip .modal-footer').html('<button class="btn btn-default btn-sm" type="button" data-dismiss="modal">关闭</button>');
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

function notAuthorized() {
  $('#modalTip .modal-body').text('没有权限');
  $('#modalTip').modal('show');
}

function showTip(tip) {
    $('#modalTip .modal-body').html(tip);
    $('#modalTip').modal('show');
}

$(document).on('click', '.table-filter .btn-reset', function () {
    $(this).parents('form')[0].reset();
    $('.filter-item .select2').val('').trigger('change');
});