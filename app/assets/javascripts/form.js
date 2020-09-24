$(document).on('change', 'form input[type="file"]', function() {
  var input = $(this);
  var files = !!this.files ? this.files : [];
  if (!files.length || !window.FileReader) return;
  if (/^image/.test(files[0].type)){
    limit = $(this).data('limit');
    if (limit && !checkSize(files[0], limit)) {
      $(this).val('');
      $('#modal-tips .modal-body').text('图片不能大于' + limit);
      $('#modal-tips').modal('show');
      return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onerror = function () {
      alert("error: " + this.error.code);
    };
    reader.onload = function(){
      input.prev().attr("src", this.result);
      input.prev().removeClass('hidden');
      input.parents('.form-group').removeClass('has-error');
      input.blur();
    }
  } else {
    input.parents('.form-group').removeClass('has-error');
    input.blur();
  }
});
$(document).on('input change', 'input[type="text"], input[type="email"], input[type="password"]', function() {
  if (($(this).data('presence') == true && $(this).val() == '') || ($(this).data('length') != undefined && $(this).val().length > parseInt($(this).data('length')))) {
    $(this).parents('.form-group').addClass('has-error');
    flag = false;
  } else {
    $(this).parents('.form-group').removeClass('has-error');
  }
});
$(document).on('input', 'textarea', function() {
  if (($(this).data('presence') == true && $(this).val() == '') || ($(this).data('length') != undefined && $(this).val().replace(/\n/g, '\r\n').length > parseInt($(this).data('length')))) {
    $(this).parents('.form-group').addClass('has-error');
    flag = false;
  } else {
    $(this).parents('.form-group').removeClass('has-error');
  }
});
$(document).on('input', 'input[type="number"]', function() {
  if (($(this).data('presence') == true && $(this).val() == '') || ($(this).val() != '' && isNaN(parseFloat($(this).val())))) {
    $(this).parents('.form-group').addClass('has-error');
    flag = false;
  } else {
    $(this).parents('.form-group').removeClass('has-error');
  }
});
$(document).on('change', 'select', function() {
  if ($(this).data('presence') == true && $(this).val() == '') {
    $(this).parents('.form-group').addClass('has-error');
    flag = false;
  } else {
    $(this).parents('.form-group').removeClass('has-error');
  }
});
$(document).on('click', 'input[type="checkbox"]', function() {
  if ($(this).parents('.checkbox-group').data('presence') == true) {
    if ($(this).parents('.checkbox-group').find('input[type="checkbox"]:checked').length == 0) {
      $(this).parents('.checkbox-group').addClass('has-error');
    } else {
      $(this).parents('.checkbox-group').removeClass('has-error');
    }
  }
});

$(document).on('click', 'form button[type="submit"]', function() {
  form = $(this).parents('form');
  flag = true;
  form.find('input[type="text"], input[type="number"], input[type="password"], textarea, select').each(function() {
    if (($(this).data('presence') == true && $(this).val() == '') || ($(this).data('length') != undefined && $(this).val().length > parseInt($(this).data('length')))) {
      $(this).parents('.form-group').addClass('has-error');
      flag = false;
    }
  });
  form.find('input[type="file"]').each(function() {
    if ($(this).parent().data('presence') == true) {
      if ($(this).val() == '' && $(this).siblings('input[type="hidden"]').val() == '') {
        $(this).parents('.form-group').addClass('has-error');
        flag = false;
      }
    }
  });
  form.find('.checkbox-group').each(function() {
    if ($(this).data('presence') == true) {
      if ($(this).find('input[type="checkbox"]:checked').length == 0) {
        $(this).addClass('has-error');
        flag = false;
      }
    }
  });
  return flag;
});

function checkSize(file, limit) {
  var fileSize = 0;
  fileSize = file.size;
  r = limit.match(/(\d+)(\w+)/);
  size = r[1]
  if (r[2] == 'MB')
   size = size * 1000
  if(fileSize / 1024 > size){
     return false;
  }
  return true;
}
