function isValidString(s) {
    if (s.length % 2 !== 0) return false;

    let stack = [];
    let pairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (let i = 0; i < s.length; i++) {
        let char = s[i];

        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else {
            let last = stack.pop();
            if (last !== pairs[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}