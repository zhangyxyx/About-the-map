draw();


var renderer;
function initRender() {
    renderer = new THREE.WebGLRenderer({
    // 在构造函数参数中设置alpha属性的值
    alpha:true
    });
    // 设置渲染区域尺寸，本质就是设置输出canvas的尺寸
    renderer.setSize(600,400);
    // 把渲染器的渲染结果canvas对象插入到'pos'对应的div元素中
    document.getElementById('pos').appendChild(renderer.domElement);

    // renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("mainCanvas") ,alpha: true});
    // //renderer = new THREE.WebGLRenderer({antialias:true});
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // //告诉渲染器需要阴影效果
    // renderer.setClearColor(0xffffff);
    // document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

//初始化dat.GUI简化试验流程
var gui;
function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
}

var light;
function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.PointLight(0xffffff);
    light.position.set(0, 0, 100);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    scene.add(light);
}

function initModel() {

    //辅助工具
    // var helper = new THREE.AxesHelper(50);
    // scene.add(helper);

    //加载OBJ格式的模型
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('img/BodaciousHabbi/');
    mtlLoader.load('obj.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('img/BodaciousHabbi/');
        objLoader.load('tinker.obj', function (object) {
            object.position.y = 0;
            object.rotation.y = 0;
            object.rotation.z = 0;
            object.rotation.x =0;
            object.scale.set(0.1, 0.06, 0.05);
            scene.add(object);

        });
    });

}

//初始化性能插件
var stats;
function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls;
function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = false;
    //是否自动旋转
    controls.autoRotate = false;
    //设置相机距离原点的最远距离
    controls.minDistance = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance = 500;
    //是否开启右键拖拽
    controls.enablePan = false;
}

function render() {
    renderer.render(scene, camera);
}

//窗口变动触发的函数
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    //renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    //更新控制器
    render();
    //更新性能插件
    //stats.update();
    controls.update();
    requestAnimationFrame(animate);
}

function draw() {
    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    //initStats();
    animate();
    window.onresize = onWindowResize;
    window.addEventListener("mousedown",mousedown);//页面绑定鼠标点击事件
}
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function mousedown(e){
    //将html坐标系转化为webgl坐标系，并确定鼠标点击位置
    mouse.x =  e.clientX / renderer.domElement.clientWidth*2-1;
    mouse.y =  -(e.clientY / renderer.domElement.clientHeight*2)+1;
    $("#bar").show()
    $("#line").show()
    $("#circle").show()
    //$("#bar").css({top:e.clientY,left:e.clientX})
    //以camera为z坐标，确定所点击物体的3D空间位置
    raycaster.setFromCamera(mouse,camera);
    //确定所点击位置上的物体数量
    var intersects = raycaster.intersectObjects(scene.children);
    //选中后进行的操作
    if(intersects.length){
        
    }
}

