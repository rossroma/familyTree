
//手动录入不同辈分之间的节点值，并定义一个数组
var eraNo = [0,1,5,13,28,45,70,112,184,290,435,460];
var erath = 290;

//滑块操作
$("#range").on({
	slide: function(){
		var ran = parseInt($("#range").val());
		if(ran<12){  //eraNo的数组长度目前只有10，以后会增加
		    $(".tree>ul>li").remove();
			erath = eraNo[ran];
			tree();
		}
	}
});


//定义一个tree方法
function tree(){

	//将json数据写入
	for(i=0;i<erath;i++)
	{
		var id = book[i].id;
		var pid = book[i].pid;
		var era = book[i].era;
		var name = book[i].name;
		var bad = book[i].bad;
		var courtesy = book[i].courtesy;
		var wifes = book[i].wifes;
		var daughters = book[i].daughters;
		var others = book[i].others;

		//id为0时，没有父信息，所以写入信息稍有不同
		if(id==0){
		firstname = "<li class='c_"+id+"'><a>"+name+"</a><ul></ul></li>"
		$(firstname).appendTo(".tree>ul");
		}else{
		firstname = "<li class='c_"+id+"'><a>"+name+"</a><ul></ul></li>"
		$(firstname).appendTo(".c_"+pid+">ul");
		};
	};

	//修改原有样式的不足
	$(".tree li ul li:only-child").parent("ul").css("paddingTop","40px").addClass("hei");

	//删除空ul
	$("ul:empty").remove();
	
	//页面宽度自适应
	$(".tree,.era").width(12000);
	var winWidth = $(window).width();
	var wrap = $(".c_0").width()+40;
	$(".tree").width(wrap);
	if(wrap>winWidth-60){
		$(".era").width(wrap+60);
	}else{
		$(".era").width(winWidth);
	};
	
	
	//鼠标移上，显示详细信息
	$(".tree li a").hover(function(){
		var i = $(this).parent().attr("class").replace(/[^0-9]/ig,"");
		//子女排序
		var order=["长","次","三","四","五","六","七","八","九"];
	
		//获取每一个参数
		var id = book[i].id;
		var pid = book[i].pid;
		var era = book[i].era;
		var name = book[i].name;
		var bad = book[i].bad;
		var courtesy = book[i].courtesy;
		var wifes = book[i].wifes;
		var daughters = book[i].daughters;
		var others = book[i].others;
		var eraCN = eraCn[era];
		// 系十九世士敬公长子
		var nn = $(this).parent("li");
		var rr = $(".c_"+pid+">ul>li").index(nn);
		var fathername = $(".c_"+pid).find("a:first").text();//他爹的名字
		var detOrder = order[rr];//长次子
		//他爹的辈分
		var fatherera = "a"+(era.replace(/[^0-9]/ig,"")-1);
		var fathereraCn = eraCn[fatherera]; 
		var relationship = "系"+fathereraCn+fathername+"公"+detOrder+"子";
		//写入详细信息
		var detail = "<div class='detail'><h4><span class='era2'>"+eraCN+"</span><span class='name'>讳<strong>"+name+"</strong></span><span class='bad'><strong>生卒：</strong>"+bad+"</span></h4><dl></dl><h5><span class='courtesy'><strong>字：</strong>"+courtesy+"</span><strong class='relationship'></strong></h5><div class='children'><div class='sons'></div><div class='daughters'></div></div></div>";
		$(detail).appendTo("body");
		//控制detail在页面中的位置
		var leftWid = $(this).offset().left;
		var topWid = $(this).offset().top;
		$(".detail").css("top",topWid+42);
		if( $(document).width()-leftWid>380 ){
			$(".detail").css("left",leftWid+26);
		}else{
			$(".detail").css("left",leftWid-380);
		};
		
		//id为0时，没有该信息
		if(id!=0){
			$(".relationship").append(relationship);
		};
	
		//添加儿子的信息
		var sonsname = $(".c_"+id+">ul>li>a");
		for(s=0;s<sonsname.length;s++){
			var ss = sonsname.eq(s).text();
			var son = "<div><strong>"+order[s]+"子：</strong>"+ss+"</div>";
			$(son).appendTo(".sons");
		};
		//添加女儿信息
		for(d=0;d<daughters.length;d++){
			var daughter = "<div><strong>"+order[d]+"女：</strong>"+daughters[d]+"</div>";
			$(daughter).appendTo(".daughters");
		};
		//添加妻子信息
		for(d=0;d<wifes.length;d++){
			if(d<1){
				var worder = "原";
			}else{
				var worder = "继";
			}
			var wife = "<dd><strong>"+worder+"配：</strong>"+wifes[d]+"</dd>";
			$(wife).appendTo(".detail dl");
		};
	
		//当有备注内容的时候，添加备注
		var oth = "<p><strong>备注：</strong>"+others+"</p>";
		if(others){
			$(".detail").append(oth);
		};
	},function(){
		$(".detail").remove();
	});
	
};


$(function(){
    //左侧滑块的载入
	$('#range').noUiSlider({
	start: [ 9 ],
	step: 1,
	orientation: 'vertical',
	range: {
		'min': [  1 ],
		'max': [ 13 ]
	}
	});
	$(".noUi-handle").attr("title","鼠标拖动控制显示层级");
	
	//写入左侧的辈分
	for(var i in eraCn){
	var cn = "<li><a>"+eraCn[i]+"</a></li>";
	$(cn).appendTo(".era");
	$(".era li:odd").addClass("bg");
	};
	
	//执行tree方法
	tree();
})
