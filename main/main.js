function main(txt, id) {
    let states = parse(txt);
    broke(states);
    let state = states[id];
    return summary(state, id, states.length);
}

function parse(txt) {
    let messages  = txt.split('\n');
    let states = [];

    for (let i = 0; i < messages.length; i++) {
        let state = {
            name: '',
            preposition: {x: 0, y: 0, z: 0},
            position: {x:0, y:0, z:0},
            id: i,
            isBroken: false,
        }

        if (isLegal(messages[i], i)) {
            let arr = messages[i].split(' ');
            if (isFirstId(i)) {
                state.name = arr[0];
                state.position = setPosion(arr[1], arr[2], arr[3]);
            }else {
                state.name = arr[0];
                state.preposition = setPosion(parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]));
                let offsetX = parseInt(arr[4]);
                let offsetY = parseInt(arr[5]);
                let offsetZ = parseInt(arr[6]);
                state.position = addPosion(state.preposition, offsetX, offsetY, offsetZ)
            }
        }else {
            setBroken(state);
        }
        states.push(state);
    }
    return states;
}

function isLegal(msg, id) {
    let result = false;
    if (isFirstId(id)) {
        let re = /^\w+\s(\d+\s){2}\d+$/;
        result = re.test(msg);
    }else{
        let re = /^\w+\s(\d+\s){5}\d+$/;
        result = re.test(msg);
    }
    return result
}

function broke (states) {
    for (let i = 1; i < states.length; i++) {
        if (!isMatched(states[i - 1], states[i])) {
            setBroken(states[i]);
            break;
        }
    }
    for (let i = 1; i < states.length; i++) {
        if (states[i - 1].isBroken)
            setBroken(states[i]);
    }
    return states;
}

function isMatched(preState, state) {
    let a = preState.position;
    let b = state.preposition;
    if (a.x == b.x && a.y == b.y && a.z == b.z){
        return true;
    }else{
        return false;
    }
}

function summary(state, id, len) {
    let result = ''
    if (id >= len) {
        result += `Cannot find ${id}`
    }else{
        if (state.isBroken) {
            result += `Error: ${id}`
        }else{
            result += `${state.name} ${state.id} ${state.position.x} ${state.position.y} ${state.position.z}`;
        }
    }
    return result;
}

function isFirstId(id) {
    if (id == 0){
        return true;
    }else {
        return false;
    }
}

function setPosion(x, y, z) {
    let posion = {};
    posion.x = x;
    posion.y = y;
    posion.z = z;
    return posion;
}

function addPosion(posion, x, y, z) {
    let newP = {};
    newP.x = posion.x + x;
    newP.y = posion.y + y;
    newP.z = posion.z + z;
    return newP;
}

function setBroken (state) {
    state.isBroken = true;
    state.position = {x: NaN, y: NaN, z: NaN};
    state.preposition = {x: NaN, y: NaN, z: NaN};
}

module.exports = main;