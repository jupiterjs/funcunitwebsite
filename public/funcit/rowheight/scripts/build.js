//steal/js funcit/rowheight/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('funcit/rowheight/scripts/build.html',{to: 'funcit/rowheight'});
});
