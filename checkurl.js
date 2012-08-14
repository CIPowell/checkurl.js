var URLChecker = function(){
	this.checker = new Worker('checkurl_worker.js');
	
	var scope = this;
	document.addEventListener('__urlchecked', function(evt)
	{
		if(scope.oncheck) scope.oncheck(evt);
	});
	
	this.checker.addEventListener('message', function(e)
	{
		console.debug(e.data);
		var resp = JSON.parse(e.data);
	
		var evt = document.createEvent('Event');	
		evt.initEvent('__urlchecked', true, true);
		evt.url = resp.url;
		evt.exists = resp.exists;
		
		document.dispatchEvent(evt);
		
	}, false);
	

	this.startCheck = function(url)
	{
		this.checker.postMessage(url);
	};
};