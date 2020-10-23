const input = document.querySelector('.search-box')
const resultWrapper = document.querySelector('.search-result-recommended')
const mode = document.querySelector('#mode')

const fruits = ['apple','orange','pineapple','manggo','starapple','grapes','banana','melon','watermelon','peach']
var hasResult = false
var isDictionaryModeOn = false
var searchInput = ''

mode.addEventListener('click', () => {
    if(mode.checked) {
        isDictionaryModeOn = true
    }
    else {
        isDictionaryModeOn = false
    }
    refreshResult()
    getResult()
})

const createResult = (fruit) => {
    hasResult = true
    const createResult = document.createElement('div')
    createResult.classList.add('result')
    createResult.textContent = fruit || `no result for "${searchInput}"`
    resultWrapper.appendChild(createResult)
    return
}

const getResult = () => {
    fruits.forEach(fruit => {
        if(searchInput==='') {
            hasResult = false
            return
        }
        if(isDictionaryModeOn) {
            if(fruit.slice(0,searchInput.length) === searchInput) {
                createResult(fruit)
            }
        }
        else {
            if(fruit.includes(searchInput)) {
                createResult(fruit)
            }
        }
    })
}

const refreshResult = () => {
    if(hasResult) {
        const result = document.querySelectorAll('.result')
        result.forEach(res => res.remove())
    }
}

input.addEventListener('keyup', e => {
    searchInput = e.target.value;
    refreshResult()
    getResult()
    if(!searchInput) return
    if (!resultWrapper.querySelector('.result')) {
        createResult(false)
    }
})