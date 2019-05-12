#artTemplate
##详细请参考地址：[https://github.com/aui/artTemplate](https://github.com/aui/artTemplate)
##项目使用实例：
```html

<script type="text/html" id="tmp-grid-detail">
    {{each list as obj i}}
    <tr>
        <td>{{obj.returnTime}}</td>
        <td>{{obj.onePrice}}</td>
        <td>{{obj.perCount}}</td>
        <td>{{obj.tradeNo}}</td>
        <td>{{obj.tradeType}}</td>
        <td>{{obj.tradeTime}}</td>
        <td>{{obj.tableNo}}</td>
        <td>{{obj.operator}}</td>
    </tr>
    {{/each}}
</script>


<script>
<script type="text/html" id="tmp-grid">
    {{each list as obj i}}
    <tr>
        <td>{{obj.first}}</td>
        <td>{{obj.totalCount}}</td>
        <td>{{obj.totalPrice}}</td>
        <td>{{templateUtil.formatInt(obj.avgTime)}}分钟</td>
        <td>{{templateUtil.formatDecimalLength2(obj.avgPrice)}}</td>
    </tr>
    {{/each}}
    <tr>
        <td>合计</td>
        <td>{{templateUtil.statisticCount(list,'totalCount')}}</td>
        <td>{{templateUtil.statisticCount(list,'totalPrice','formatDecimalLength2')}}</td>
        <td id="avgTime" data-value="{{templateUtil.statisticAverageTime(list)}}">{{templateUtil.statisticAverageTime(list,'formatInt')}}分钟</td>
        <td id="avgPrice" data-value="{{templateUtil.statisticAveragePrice(list)}}">{{templateUtil.statisticAveragePrice(list,'formatDecimalLength2')}}</td>
    </tr>
</script>
<script>
var templateUtil = {
        formatRate: function (value) {
            var num = value * 100;
            num = num.toFixed(2);
            return num + '%';
        },
        formatInt: function (value) {
            return value.toFixed(0);
        },
        statisticAverage: function (set, field, formatType) {

            var all = 0;
            for (var i = 0; i < set.length; i++) {
                all = all + set[i][field];
            }
            var avg = all / i;
            if (formatType) {
                avg = this[formatType](avg);
            }
            return avg;
        },
        statisticCount: function (set, field, formatType) {

            var all = 0;
            for (var i = 0; i < set.length; i++) {
                all = all + set[i][field];
            }
            if (formatType) {
                all = this[formatType](all);
            }
            return all;
        },
        statisticAverageTime: function (set, formatType) {
            //同一时段每一张订单从消费到结账的时间差的平均值，精确到分钟
            var allOrder = 0;
            var allTime = 0;
            for (var i = 0; i < set.length; i++) {
                allOrder = allOrder + set[i]['totalCount'];
                allTime = allTime + set[i]['avgTime'] * set[i]['totalCount'];
            }
            var avg = allTime / allOrder;
            if (formatType) {
                avg = this[formatType](avg);
            }
            return avg;
        },
        statisticAveragePrice: function (set, formatType) {
            // 订单总额 / 订单数，值采用四舍五入的方式 保留2位小数
            var allOrder = 0;
            var allPrice = 0;
            for (var i = 0; i < set.length; i++) {
                allOrder = allOrder + set[i]['totalCount'];
                allPrice = allPrice + set[i]['totalPrice'];
            }
            var avg = allPrice / allOrder;
            if (formatType) {
                avg = this[formatType](avg);
            }
            return avg;
        },
        formatDecimalLength2: function (num) {
            return templateUtil.formatDecimalLength(num, 2)
        }

    }
    //格式化小数
    templateUtil.formatDecimalLength = function (num, len) {
        var jishu = 1;
        var numStr = num.toString();

        if (len == 1) {
            jishu = 1 * 10;
        } else if (len == 2) {
            jishu = 1 * 100;
        } else if (len == 3) {
            jishu = 1 * 1000;
        } else if (len == 4) {
            jishu = 1 * 10000;
        }

        if (numStr.indexOf('.') > -1) {
            //小数位数
            var decimalLength = numStr.substr(numStr.indexOf('.') + 1).length;
            if (decimalLength > len) {
                num = num.toFixed(len);
                num = parseFloat(num);
            }
        }
        return num;
    }
    template.helper('templateUtil', templateUtil);
</script>

可以将模板中得计算 放到 template.helper （包含return）函数中，
<script type="text/html" id="tmp-grid">
    {{each list as obj i}}
    <tr>
        <td>{{obj.first}}</td>
        <td>{{obj.totalCount}}</td>
        <td>{{obj.totalPrice}}</td>
        <td>{{templateUtil.formatInt(obj.avgTime)}}分钟</td>
        <td>{{templateUtil.formatDecimalLength2(obj.avgPrice)}}</td>
    </tr>
    {{/each}}
    <tr>
        <td>合计</td>
        <td>{{templateUtil.statisticCount(list,'totalCount')}}</td>
        <td>{{templateUtil.statisticCount(list,'totalPrice','formatDecimalLength2')}}</td>
        <td id="avgTime" data-value="{{templateUtil.statisticAverageTime(list)}}">{{templateUtil.statisticAverageTime(list,'formatInt')}}分钟</td>
        <td id="avgPrice" data-value="{{templateUtil.statisticAveragePrice(list)}}">{{templateUtil.statisticAveragePrice(list,'formatDecimalLength2')}}</td>
    </tr>
</script>

```