function Book ($viewCatalog,$viewScreen,$viewPager) {
    this.$viewCatalog = $viewCatalog;
    this.$viewScreen = $viewScreen;
    this.$viewPager = $viewPager;
};
Book.prototype = {

    //目录视图
    $viewCatalog:null,
    //正文视图
    $viewScreen:null,
    catalogUrl:'sidebar.md',
    dataMap:{ },
    dataSet:[],
    currentIndex:0,
    init: function (){
        this.initCatalog();
        var _this = this;
        //bind event
        this.$viewPager.on('click','.btn',function(e){
            var jdom =  $(this);
            var index =0;
            if(jdom.hasClass('btn-last')){
                index =  _this.dataSet.length;
            }else if(jdom.hasClass('btn-prev')){
                index = _this.currentIndex -1;
            }else if(jdom.hasClass('btn-next')){
                index = _this.currentIndex +1;
            }

            if(index<0){
                index = 0;
            }else if(index>_this.dataSet.length-1){
                index = _this.dataSet.length-1;
            }
            if(_this.dataSet.length>0){
                var url = _this.dataSet[index];
                _this.rendViewScreen(url);
                _this.currentIndex = index;
            }
        });
    },
    initCatalog: function(){
        var _this = this;
        $.get(this.catalogUrl,function (data){
            var html = marked(data);
            _this.$viewCatalog.html(html);
            _this.dataSet = [];
            _this.dataMap = {};
            _this.$viewCatalog.find('ol li a').each(function(item){
                var hrefStr = $(this).attr('href');
                var url = hrefStr.replace('#','')+'.md';
                _this.dataMap[item]=url;
                _this.dataSet.push(url);
                $(this).attr('data-index',item);
            });
            // bind event
            _this.$viewCatalog.on('click','ol li a',function (ev){
                var hrefStr = $(this).attr('href');
                var url = hrefStr.replace('#','')+'.md';
                _this.rendViewScreen(url);
                _this.currentIndex = $(this).attr('data-index');
            });
        });
    },

    rendViewScreen : function (url){
        var _this = this;
        $.get(url,function (data){
            var html = marked(data);
            _this.$viewScreen.html(html);
            _this.highlightBlock();
        });
    }
    ,
    highlightBlock:function (){
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
}