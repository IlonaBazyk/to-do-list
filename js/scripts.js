$(function() {
	var lastIndex = 0;
	// поскольку ключи в localStorage заданы числами - ищем число последнего ключа в localStorage
	for (var name in localStorage){
      lastIndex = name
  }

  if (lastIndex!==0) {
  	lastIndex = Number(lastIndex)+1
  }
 
  // виводим задачи из localStorage
	function setTasks(){
		for (var i = 0; i <=lastIndex; i++) {
			var taskText = localStorage.getItem(i)
			if (taskText == null) continue;
			// с учетом приоритета
			if (taskText.slice(0,1) == 0) {
					$('.input').after('<div class="task" data-number='+ i +'><div class="checkbox"></div><span>' + taskText.slice(1,taskText.length) + '</span><i class="fa fa-times close" aria-hidden="true"></i><i class="icon icon-priority-low"><i/></div>')	
			} else if (taskText.slice(0,1) == 1){
					$('.input').after('<div class="task" data-number='+ i +'><div class="checkbox"></div><span>' + taskText.slice(1,taskText.length) + '</span><i class="fa fa-times close" aria-hidden="true"></i><i class="icon icon-priority-middle"><i/></div>')	
		
			} else if (taskText.slice(0,1) == 2){
					$('.input').after('<div class="task" data-number='+ i +'><div class="checkbox"></div><span>' + taskText.slice(1,taskText.length) + '</span><i class="fa fa-times close" aria-hidden="true"></i><i class="icon icon-priority-high"><i/></div>')
			}
			}
	}
	setTasks()
// показываем поле ввода заметок 
$('.add').click(function(){
	$('.input').slideToggle()
	$('input[type=text]').trigger('focus')
	$(this).find('i').toggleClass('fa-plus fa-times')
})

// добавляем новую заметку
$('input[type=submit]').click(function(){
	if ($('input[type=text]').val()!==""){
		$('.input').after('<div class="task" data-number='+ lastIndex +'><div class="checkbox"></div><span>' + $('input[type=text]').val() + '</span><i class="fa fa-times close" aria-hidden="true"></i><i class="' + $('input[type=radio]:checked').attr('class') + '"><i/></div>')
		// сохранение приоритета в localStorage
		var priority
		if ($('input[type=radio]:checked').attr('class') === "icon icon-priority-low") {
			priority = 0;
		} else if ($('input[type=radio]:checked').attr('class') === "icon icon-priority-middle") {
			priority = 1;
		} else {
			priority = 2;
		}
		localStorage.setItem(lastIndex++, priority + $('input[type=text]').val())
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
	localStorage.removeItem($(this).parent().data('number'))
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


	
		
		
	

})