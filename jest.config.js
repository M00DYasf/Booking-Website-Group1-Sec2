module.exports = {
    bail: true,
    moduleFileExtensions: ["ts", "js"],
    roots: ["src"],
    testMatch: ['**/__tests__/**'],
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
}