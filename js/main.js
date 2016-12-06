lastResult = '';


itemsScanned = [];//as [UPC, count]

$(document).ready(function(){

	$('#newScan').click(function(){
		if( !$('#newScan').hasClass('quaggaOn')){
			
			initQuagga();
		}else{
			stopQuagga();
		}
	});
	
	$('#cancelScan').click(function(){
		stopQuagga();
	});
	
});

function initQuagga(){
	$('#newScan').addClass('quaggaOn');
	$('#scanner').toggle();

	Quagga.init({
	    inputStream : {
	      name : "Live",
	      type : "LiveStream",
	      target: document.querySelector('#scanner')    // Or '#yourElement' (optional)
	    },
	    decoder : {
	      readers : ["upc_reader"]
	    }
	  }, function(err) {
	      if (err) {
	          console.log(err);
	          return
	      }
	      console.log("Initialization finished. Ready to start");
	      Quagga.start();
	  });
}

function stopQuagga(){
	$('#newScan').removeClass('quaggaOn');
	$('#scanner').toggle();
	lastResult = '';
	
	Quagga.stop();
}

/*
*/

function renderList(){
	$('ul.list-group').html('');//empty it

	jQuery.each(itemsScanned, function(i, v){
		$('ul.list-group').append("<li class='list-group-item'><span class='badge'>"+v[1]+"</span><h4 class='list-group-item-heading'>Product "+i+"</h4><p class='list-group-item-text'>"+v[0]+"</p></li>");
	});
}

Quagga.onDetected(function(result) {
        var code = result.codeResult.code;

        if (lastResult !== code) {
            lastResult = code;
            
            found = false;
            jQuery.each(itemsScanned, function(i, v){
            	if(v[0] == lastResult){
	            	found = true;
            		v[1]++;	
            	}
            });
            
            if(!found){
            	itemsScanned.push([lastResult, 1]);
            }
            
            //console.log(itemsScanned);
            stopQuagga();
            renderList();
        }
        
});