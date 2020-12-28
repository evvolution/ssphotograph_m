
getData() 

var reslink = 'https://fsnewsres.foshanplus.com/h5/mall/'


function getData() {
    $("#current_GOAL").html('已售清单')
    $("#order_table_body").html("")
    $.ajax({
        type:"get",
        url: 'https://api.foshanplus.com/foshan/api/v2/getPurchaseOrdersForAdmin?openid=foshanplusopenidsgljwkegljklrgjekrjegre',
        dataType:"json",
        success:function(res) {
            console.log(res.data)
            let income = 0;
            for(let i = 0; i < res.data.length; i++) {
                let line1 = ''
                let line2 = ''
                let line3 = ''
                let line4 = ''
                let line5 = ''
                let line = ''
                line1 = '<tr>' + '<td>' + (i+1) + '</td>' +  '<td>' + res.data[i].consignee + '</td>';
                line2 = '<td>' + res.data[i].phone + '</td>' + '<td class="address">' + res.data[i].address + '</td>' + '<td>' + res.data[i].shopName + '</td>' +'<td>' + res.data[i].name + '</td>';
                line3 = '<td class="headimg"><a target="_blank" href="' + reslink + res.data[i].headImgPath + '"><img src="' + reslink + res.data[i].headImgPath + '"></a></td>';
                line4 = '<td>' + res.data[i].surplusCount + '</td>' + '<td>￥' + Number(res.data[i].price)/100 + '</td>' + '<td>' + res.data[i].count + '</td>' + '<td>￥' + Number(res.data[i].amount)/100 + '</td>';
                line5 = '<td>' + res.data[i].createTime + '</td>' + '<td>' + res.data[i].payTime + '</td>' + '</tr>';
                line = line1 + line2 + line3 + line4 + line5
                $("#order_table_body").append(line)
                income += (Number(res.data[i].price)/100)
            }
            $("#count").html(res.data.length)
            $("#income").html(income)
            var curTime = getTime().year + '/' + getTime().month + '/' + getTime().today + ' ' + getTime().hours + ':' + getTime().min + ':' + getTime().sec
            $("#currentTime").html('截至' + curTime)
            $("#createExcel").css("display","inline")
        },
        error: function() {
            alert('服务器繁忙')
            return;
        }
    })
}

function createExcel() {
    var fileName = '已售清单' + getTime().year + getTime().month + getTime().today + '-' + getTime().hours + ':' + getTime().min + ':' + getTime().sec + '.xls'
    $("#order_table").table2excel({
        exclude: ".headimg",
        name: "Worksheet Name",
        filename: fileName, 
        preserveColors: false, 
        exclude_img: false,
    });
}

function getTime() {
    var time = new Date();
    var year = time.getFullYear()
    var month = time.getMonth() + 1;
    var today = time.getDate();
    var hours = time.getHours();
    var min =  time.getMinutes()
    var sec = time.getSeconds();

    return {
        'year':year,
        'month':month,
        'today':today,
        'hours':hours,
        'min':min,
        'sec':sec,
    }
}

function getStore() {
    $("#current_GOAL").html('当前库存')
    $("#store_table_body").html("")
    $.ajax({
        type:"get",
        url: 'https://api.foshanplus.com/foshan/api/v2/goodsInventory?activityCode=ceramics_2020',
        dataType:"json",
        success:function(res) {
            console.log(res.goods)
            let viewCount = 0;
            let total = 0;
            let sold = 0;
            for(let i = 0; i < res.goods.length; i++) {
                let line1 = ''
                let line2 = ''
                let line3 = ''
                let line4 = ''
                let line = ''
                line1 = '<tr>' + '<td>' + (i+1) + '</td>' +  '<td>' + res.goods[i].name + '</td>' +  '<td>' + res.goods[i].id + '</td>';
                line2 = '<td class="headimg"><a target="_blank" href="' + reslink + res.goods[i].headImgPath + '"><img src="' + reslink + res.goods[i].headImgPath + '"></a></td>';
                line3 = '<td>' + res.goods[i].shopName + '</td>' + '<td>￥' + Number(res.goods[i].price)/100 + '</td>' + '<td>' + res.goods[i].specs.split('#')[0] + '</td>';
                line4 = '<td>' + res.goods[i].surplusCount + '</td>' + '<td>' + res.goods[i].buyCount + '</td>' + '<td>' + res.goods[i].visitsCount + '</td>';
                line = line1 + line2 + line3 + line4
                $("#store_table_body").append(line)
                total += Number(res.goods[i].surplusCount)
                viewCount += Number(res.goods[i].visitsCount)
                sold += Number(res.goods[i].buyCount)
            }
            $("#p_count").html(res.goods.length + '项' + '(余' + total + '件)' )
            $("#p_viewCount").html(viewCount + '次')
            $("#p_sold").html(sold + '件')
            var curTime = getTime().year + '/' + getTime().month + '/' + getTime().today + ' ' + getTime().hours + ':' + getTime().min + ':' + getTime().sec
            $("#currentTime_store").html('截至' + curTime)
            $("#createExcel_store").css("display","inline")
        },
        error: function() {
            alert('服务器繁忙')
            return;
        }
    })
}

function createExcel_store() {
    var fileName = '当前库存' + getTime().year + getTime().month + getTime().today + '-' + getTime().hours + ':' + getTime().min + ':' + getTime().sec + '.xls'
    $("#store_table").table2excel({
        exclude: ".headimg",
        name: "Worksheet Name",
        filename: fileName, 
        preserveColors: false, 
        exclude_img: false,
    });
}