import Vue from "vue";
Vue.filter('formateTime', function(time, formate) {
	time = new Date(time);
	var yearReg = /(y+)/;

	formate = formate.replace(yearReg, function($1) {
		return (time.getFullYear() + '').substr(4 - $1.length);
	});

	var o = {
		'm+': time.getMonth() + 1,
		'd+': time.getDate(),
		's+': time.getSeconds()
	}

	for (var attr in o) {
		formate = formate.replace(new RegExp(attr), function() {
		  return (o[attr] < 10 ? '0' : '') + o[attr];
		})
	}
	return formate;
})
