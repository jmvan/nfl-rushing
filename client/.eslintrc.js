module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
       "plugin:react/recommended",
       "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": ["simple-import-sort"],
    "rules": {
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error"
    }
};
