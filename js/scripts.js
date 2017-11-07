// показываем поле ввода заметок 
$('.add').click(function(){
  $('.input').slideToggle()
  $('input[type=text]').trigger('focus')
  $(this).find('i').toggleClass('fa-plus fa-times')
})

// добавляем новую заметку
$('input[type=submit]').click(function(){
  if ($('input[type=text]').val()!==""){
    $('.input').after('<div class="task"><div class="checkbox"></div><span>' + $('input[type=text]').val() + '</span><i class="fa fa-times close" aria-hidden="true"></i><i class="' + $('input[type=radio]:checked').attr('class') + '"><i/></div>')
    $('input[type=text]').val('')    
  }
})

// добавляем новую заметку клавишей enter
$('input[type=text]').keypress(function(){
    if(event.keyCode==13) {
      $('input[type=submit]').click();
      return false;
     }
})

// выделение заметки как выполненой
$('body').on( "click", '.checkbox', function() {
  $(this).parent().toggleClass('done')
})

// удаление заметки
$('body').on( "click", '.close', function() {
  $(this).parent().detach()
})

// открытие и закрытие фильтров
$('.filters').click(function(){
	$('.filter-selection').toggle()
})

// фильтр
$('.icon-priority').click(function(){
	if($(this).data('priority')=='high'){
		$('.task').hide()
		$('.task .icon-priority-high').parent().show()
	}else if ($(this).data('priority')=='middle'){
		$('.task').hide()
		$('.task .icon-priority-middle').parent().show()
	}else if ($(this).data('priority')=='low'){
		$('.task').hide()
		$('.task .icon-priority-low').parent().show()
	}else if ($(this).data('priority')=='none'){
		$('.task').show()
	}
})
