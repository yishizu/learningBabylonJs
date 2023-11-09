const createScene =  () => {
    const scene = new BABYLON.Scene(engine);
    const boxes = [];

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.registerInstancedBuffer("color",4);
    box.instancedBuffers.color = new BABYLON.Color4(1,0,0,1);

    for(var i=0; i<1000; i++){
        var instance = box.createInstance("box"+i)
        instance.position.x = 12.5 - Math.random()*25;
        instance.position.y = 12.5 - Math.random()*25;
        instance.position.z = 12.5 - Math.random()*25;
        instance.scaling.x = 0.5 + Math.random(); // X軸のスケーリング
        instance.scaling.y = 0.5 + Math.random(); // Y軸のスケーリング
        instance.scaling.z = 0.5 + Math.random(); // Z軸のスケーリング
        
        instance.instancedBuffers.color = new BABYLON.Color4(Math.random(),0,Math.random(),1);
        instance.metadata = {
            id: i,
            price: Math.floor(Math.random() * 1000),
            category: `Category ${Math.floor(Math.random() * 10)}`,
            subcategory: `SubCategory ${Math.floor(Math.random() * 10)}`,
            name: `Name ${Math.floor(Math.random() * 10)}`,
        };

        boxes.push(instance);
    }

    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
            if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh) {
                let pickedMesh = pointerInfo.pickInfo.pickedMesh;
            
                if (pickedMesh.metadata) {
                    console.log(`ID: ${pickedMesh.metadata.id}`);
                    console.log(`Price: ${pickedMesh.metadata.price}`);
                    console.log(`Category: ${pickedMesh.metadata.category}`);
                    console.log(`SubCategory: ${pickedMesh.metadata.subcategory}`);
                    console.log(`Name: ${pickedMesh.metadata.name}`);
                    // Display information in the HTML page, or use an alert
                    alert(`ID: ${pickedMesh.metadata.id}
                    \nPrice: ${pickedMesh.metadata.price}
                    \nCategory: ${pickedMesh.metadata.category}
                    \nSubCategory: ${pickedMesh.metadata.price}
                    \nName: ${pickedMesh.metadata.name}`);
                }

            }
        }
    });
    return scene;
}