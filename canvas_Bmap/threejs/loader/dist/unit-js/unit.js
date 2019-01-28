function init(e) {
    container = e, initCamera(), initScene(), initLight(), initRenderer(), initControls(), addGroup(), animate(), loader = new THREE.JSONLoader
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight, camera.updateProjectionMatrix(), webglRenderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
    requestAnimationFrame(animate), carMesh && (carMesh.rotation.y += -.002), webglRenderer.render(scene, camera), controls.update()
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 5e3), camera.position.set(50, 50, 1e3)
}

function initScene() {
    scene = new THREE.Scene
}

function initLight() {
    var e = new THREE.SpotLight("0xf1e9d3");
    e.position.set(500, 1e3, 0), e.castShadow = !0, e.distance = 1600, e.intensity = 3;
    var r = new THREE.AmbientLight("#ffffff");
    scene.add(e), scene.add(r)
}

function initRenderer() {
    webglRenderer = new THREE.WebGLRenderer({
        antialias: !0
    }), webglRenderer.setClearColor(3355443), webglRenderer.setSize(window.innerWidth, window.innerHeight), webglRenderer.domElement.style.position = "relative", container.appendChild(webglRenderer.domElement), webglRenderer.shadowMapEnabled = !0
}

function initControls() {
    controls = new THREE.OrbitControls(camera), controls.rotateSpeed = .8, controls.minDistance = 300, controls.zoomSpeed = .8, controls.panSpeed = .8, controls.maxDistance = 600, controls.minPolarAngle = 0, controls.maxPolarAngle = Math.PI
}

function addGroup() {
    var e = new THREE.Mesh(new THREE.CylinderGeometry(200, 100, .1, 100), new THREE.MeshPhongMaterial({
        color: 3355443
    }));
    e.position.y = -40, e.receiveShadow = !0, scene.add(e)
}

function SetSkyBox(e) {
    var r = e;
    urls = [r + "posx.jpg", r + "negx.jpg", r + "posy.jpg", r + "negy.jpg", r + "posz.jpg", r + "negz.jpg"], textureCube = THREE.ImageUtils.loadTextureCube(urls);
    var n = THREE.ShaderLib.cube;
    n.uniforms.tCube.value = textureCube;
    var a = new THREE.ShaderMaterial({
            fragmentShader: n.fragmentShader,
            vertexShader: n.vertexShader,
            uniforms: n.uniforms,
            side: THREE.BackSide
        }),
        o = new THREE.SphereGeometry(1e3, 100, 100),
        t = new THREE.Mesh(o, a);
    scene.add(t)
}

function renderCar(e, r) {
    loader.load(e, function (e, n) {
        switch (r) {
            case "baoma":
                createBaomaScene(e, n);
                break;
            case "kayan":
                createKayanScene(e, n);
                break;
            case "aodi":
                createAodiScene(e, n);
                break;
            case "luhu":
                createlandRoverScene(e, n)
        }
        carMesh.position.set(0, -40, 0), carMesh.castShadow = !0, scene.add(carMesh)
    })
}

function removeClass(e) {
    for (var r = e.parentNode.children, n = 0; n < r.length; n++) r[n].style.color = "#ffffff";
    e.style.color = "red"
}

function resetColor(e) {
    void 0 != part ? part.color = new THREE.Color(e) : (carbody.color = new THREE.Color(e), carcheding.color = new THREE.Color(e), carmenbashou.color = new THREE.Color(e), carhoushijing.color = new THREE.Color(e), carzuoyi.color = new THREE.Color(e), carcexian && (carcexian.color = new THREE.Color(e)), carhoushijingx && (carhoushijingx.color = new THREE.Color(e)), carOther && (carOther.color = new THREE.Color(e)))
}

function getMaterial(e) {
    return texture = THREE.ImageUtils.loadTexture(e + ".jpg"), material = new THREE.MeshPhongMaterial({
        reflectivity: .2,
        shininess: 1e3,
        emissive: 1,
        specular: 16777215,
        map: texture,
        envMap: textureCube,
        side: THREE.DoubleSide,
        color: new THREE.Color(.8, .8, .8)
    })
}

function setProcess() {
    var e = document.getElementById("loading");
    e.value += e.value, 100 == e.value && (window.clearInterval(timer), document.getElementById("loaddng-box").style.display = "none")
}

function bartimer() {
    timer = setInterval(setProcess, 200)
}
var container, camera, scene, webglRenderer, loader, carbody, texture;
window.onload = function () {
    var e = document.getElementById("ThreeJS");
    init(e);
    var r = "./images/";
    SetSkyBox(r), bartimer();
    // window.addEventListener("resize", onWindowResize, !1)
};
var carmenbashou, carcheding, carcexian, carlugu, carhoushijing, carMesh, carzuoyi, geometry, part, controls, textureCube, carhoushijingx, carOther, material;