const fetchQuotesButton = document.getElementById('load-quotes-btn');
const addQuoteButton = document.getElementById('add-quote-btn');
const authorStatsButton = document.getElementById('load-author-stats-btn');
const sortButton = document.getElementById('sort-btn');
const searchForm = document.getElementById('search-form');

let quotes = [];
let saveQuotes = [];

function sortQuotes(sortValue) {
    return quotes.sort((a, b) => {
        if (sortValue === 'author') {
            return a.author.localeCompare(b.author);
        } else if (sortValue === 'recipient') {
            if (!a.recipient && !b.recipient) {
                return a.author.localeCompare(b.author);
            } else if (!a.recipient) {
                return 1;
            } else if (!b.recipient) {
                return -1;
            }
            return a.recipient.localeCompare(b.recipient);
        }else if (sortValue === 'created') {   
            return new Date(a.created_at) - new Date(b.created_at) || a.author.localeCompare(b.author);
        } else {
            return a.id - b.id;
        }
    });
}

function addQuotes(quotes) {
    const container = document.getElementById('quotes');
    const template = document.getElementById('quote-template');
    quotes.forEach(quote => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('p').textContent = quote.quote;
        if (quote.recipient && quote.emotion) {
            clone.querySelector('.author').innerHTML = `${quote.author} to ${quote.recipient}, <i>${quote.emotion}</i>`;
        } else if (quote.recipient) {
            clone.querySelector('.author').textContent = `${quote.author} to ${quote.recipient}`;
        } else if (quote.emotion) {
            clone.querySelector('.author').innerHTML = `${quote.author}, <i>${quote.emotion}</i>`;
        } else {
            clone.querySelector('.author').textContent = quote.author;
        }
        if (quote.author === 'Felix') {
            clone.querySelector('.quote').classList.add('Felix');
        }
        container.appendChild(clone);
    });
}

function loadQuotes() {
    fetch('/quotes')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const newQuotes = data.filter(quote => !quotes.some(existingQuote => existingQuote.id === quote.id));
            quotes.push(...newQuotes);
            quotes = quotes.filter(existingQuote => data.some(quote => quote.id === existingQuote.id));
            saveQuotes = quotes;
            addQuotes(newQuotes);
        })
        .catch(error => {
            console.error(error);
        });
}

function reloadQuotes(givenQuotes = []) {
    const reloadQuotes = givenQuotes.length ? givenQuotes : quotes;
    const container = document.getElementById('quotes');
    container.innerHTML = '';
    addQuotes(reloadQuotes);
}

fetchQuotesButton.addEventListener('click', () => {
    loadQuotes();
});

addQuoteButton.addEventListener('click', () => {
    const author = document.getElementById('author-input').value;
    const quote = document.getElementById('quote-input').value;
    const recipient = document.getElementById('recipient-input').value;
    const emotion = document.getElementById('emotion-input').value;

    document.getElementById('author-input').value = '';
    document.getElementById('quote-input').value = '';
    document.getElementById('recipient-input').value = '';
    document.getElementById('emotion-input').value = '';

    fetch('/quotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, quote, recipient: recipient || null, emotion: emotion || null }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Quote added successfully!');
                loadQuotes();
            } else {
                console.error('Failed to add quote!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function loadAuthorStats() {
    fetch('/stats')
        .then(response => response.json())
        .then(data => {
            const authorStats = document.getElementById('author-stats-list');
            const template = document.getElementById('author-stats-template');
            authorStats.innerHTML = '';
            data.forEach(row => {
                const clone = template.content.cloneNode(true);
                clone.querySelector('.author-name').textContent = row.author;
                clone.querySelector('.quote-count').textContent = `${row.count} quote${row.count > 1 ? 's' : ''}`;

                authorStats.appendChild(clone);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

authorStatsButton.addEventListener('click', () => {
    loadAuthorStats();
});

// Load quotes and stats at startup
window.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    sortQuotes('created');
    reloadQuotes();
    loadAuthorStats();
    document.getElementById('sort-by').value = 'created';
});


sortButton.addEventListener('click', () => {
    const sortValue = document.getElementById('sort-by').value;
    quotes = sortQuotes(sortValue);
    reloadQuotes();
});

searchForm.addEventListener('submit', (e) => {
    console.log('searching');
    e.preventDefault();
    const searchValue = document.getElementById('search-input').value.trim().toLowerCase();
    if (!searchValue) {
        quotes = saveQuotes;
        reloadQuotes();
        return;
    }
    quotes = saveQuotes.filter(quote => {
        return quote.author.toLowerCase().includes(searchValue) || quote.quote.toLowerCase().includes(searchValue) || (quote.recipient && quote.recipient.toLowerCase().includes(searchValue)) || (quote.emotion && quote.emotion.toLowerCase().includes(searchValue));
    });
    reloadQuotes();
});

