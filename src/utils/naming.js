var createName = (role) => {
    var number = Math.random().toFixed(3) * 1000;
    return role + number.toString();
}

export default createName;
