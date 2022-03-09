function autoplay(){
    move_time = serInterval(() => {
        index++
        moveBy(ul,'left', -index * wrap_width, movend)
    },2000)
}

function move(ele,type,value,cb){
    let spe = parseInt(getComputedStyle(ele)[type])
    change_timer = setInterval(() => {
        value > spe ? spe += 10: spe -= 10
        ele.style[type] = spe + 'px'
        if(value > spe){
            if(spe >= value){
                clearInterval(change_timer)
                cb()
            }
        }else{
            if(spe <= value){
                clearInterval(change_timer)
                cb()
            }
        }
    },10)
}

function movend() {
    if (index >= ul.children.length - 1) {
        index = 1
        ul.style.left = -index * wrap_width + 'px'
    }
    if (index <= 0) {
        index = ol.children.length
        ul.style.left = -index * wrap_width + 'px'
    }
    for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
    }
    ol.children[index - 1].className = 'active'
    flag = false
}
//1、获取盛放图片的盒子和盛放焦点的盒子
let ul = document.querySelector('ul')
let ol = document.querySelector('ol')

//获取大盒子和大盒子的宽
let wrap = document.querySelector('section')
let wrap_width = wrap.clientWidth
    //9、解决连续点击页面混乱问题
    //添加开关，点击前关着，点击后图片未切换完成开着，图片切换完打开开关
let flag = false
    //2、添加焦点
const frg = document.createDocumentFragment()
for (let i = 0; i < ul.children.length; i++) {
    let focus = document.createElement('li')
    frg.appendChild(focus)
        //焦点初始化
    if (i == 0) focus.className = 'active'
}
ol.appendChild(frg)
    //3、复制元素，将复制元素放在指定位置
    //改变盛放图片的盒子大小,改变图片位置，使页面打开时显示第一张图片
let first = ul.firstElementChild.cloneNode(true)
let last = ul.lastElementChild.cloneNode(true)
ul.appendChild(first)
ul.insertBefore(last, ul.firstElementChild)
ul.style.width = ul.children.length * 100 + '%'
ul.style.left = -wrap_width + 'px'
    //4、图片自动轮播
    //设置一个图片索引
let index = 1
    //一会儿会用到这段代码，就直接封装成函数了
autoplay()
    //5、鼠标移入停播，移出开始播放
wrap.onmouseover = () => clearInterval(move_time)
wrap.onmouseout = () => autoplay()
    //6、点击左右按钮切换图片
    //获取左右按钮
let left = document.querySelector('div').firstElementChild
let right = document.querySelector('div').lastElementChild
    //点击左按钮，索引减少，图片切到上一张
left.onclick = function() {
        if (flag) return
        index--
        move(ul, 'left', -index * wrap_width, movend)
        flag = true
    }
    //点击右按钮，索引增加，图片切到下一张
right.onclick = function() {
        if (flag) return
        index++
        move(ul, 'left', -index * wrap_width, movend)
        flag = true
    }
    //7、点击焦点切换图片
for (let i = 0; i < ol.children.length; i++) {
    //获取焦点索引
    ol.children[i].id = i
        //点击焦点切换图片
    ol.children[i].onclick = function() {
        if (flag) return
        index = this.id - 0 + 1
        move(ul, 'left', -index * wrap_width, movend)
        flag = true
    }
}
//8、解决切屏后页面混乱问题
document.onvisibilitychange = () => document.visibilityState == 'hidden' ? clearInterval(move_time) : autoplay()

