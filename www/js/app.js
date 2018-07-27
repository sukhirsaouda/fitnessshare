// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    // App root data
    data: function () {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
            // Demo products for Catalog section
            products: [
                {
                    id: '1',
                    title: 'Apple iPhone 8',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
                },
                {
                    id: '2',
                    title: 'Apple iPhone 8 Plus',
                    description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
                },
                {
                    id: '3',
                    title: 'Apple iPhone X',
                    description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
                },
            ]
        };
    },
    // App root methods
    methods: {
        helloWorld: function () {
            app.dialog.alert('Hello World!');
        },
    },
    // App routes
    routes: routes,
});

$$(document).on('page:init', '.page[data-name="provider"]', function (e) {
    app.request({
        url: 'https://toolkit.librehealth.io/master/ws/rest/v1/provider',
        xhrFields: {
            withCredentials: true
        },
        dataType:'json',
        headers: {
            'Authorization': 'Basic ' + btoa(localStorage.omrsUser + ':' + localStorage.omrsPass)
        },
        success: function (data) {
            for (let provider of data.results) {
                $$('#checkboxDiv').append('<input type="checkbox" value="' + provider.display + '"/>' + provider.display + '<br/>');
            }
        }
    });
});

function loginAndSaveOmrs() {
    let omrsUser = document.getElementById('omrsUserField').value;
    let omrsPass = document.getElementById('omrsPassField').value;
    let omrsUrl = document.getElementById('omrsUrlField').value;

    localStorage.setItem('omrsUser', omrsUser);
    localStorage.setItem('omrsPass', omrsPass);
    localStorage.setItem('omrsUrl', omrsUrl);
}

function loginAndSaveBahmni() {
    let bahmniUser = document.getElementById('bahmniUserField').value;
    let bahmniPass = document.getElementById('bahmniPassField').value;
    let bahmniUrl = document.getElementById('bahmniUrlField').value;

    localStorage.setItem('bahmniUser', bahmniUser);
    localStorage.setItem('bahmniPass', bahmniPass);
    localStorage.setItem('bahmniUrl', bahmniUrl);
}

// Init/Create views
var homeView = app.views.create('#view-home', {
    url: '/'
});
var catalogView = app.views.create('#view-catalog', {
    url: '/catalog/'
});
var settingsView = app.views.create('#view-settings', {
    url: '/settings/'
});