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
        dataType: 'json',
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

$$(document).on('page:init', '.page[data-name="catalog"]', function (e) {
    var calendarModal = app.calendar.create({
        inputEl: '#demo-calendar-modal',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'yyyy-mm-dd',
        rangePicker: true,
        closeOnSelect: true
    });
});

function getFitbitData() {
    var dates = $$('#demo-calendar-modal').val().split(' - ');
    app.request({
        url: 'https://api.fitbit.com/1/user/-/body/log/weight/date/' + dates[0] + '/' + dates[1] +'.json',
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        success: function (data) {
            localStorage.setItem('weight', JSON.stringify(data.weight));
            $$('#dataDiv').html('');
            for (let weight of data.weight) {
                $$('#dataDiv').append('BMI = ' + weight.bmi + '<br/>');
                $$('#dataDiv').append('Date/Time = ' + weight.date + ' ' + weight.time + '<br/>');
                $$('#dataDiv').append('Weight = ' + weight.weight);
            }
        }
    });
}

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

function doFitbitOAuth() {
    var endUrl = "https://fitnessshare.ashwini/authCallback";
    var startUrl = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22CXLF&redirect_uri=https%3A%2F%2Ffitnessshare.ashwini%2FauthCallback&scope=activity%20heartrate%20nutrition%20sleep%20weight&expires_in=31536000";

    var browser = cordova.InAppBrowser.open(startUrl, '_blank', 'location=yes');
    browser.addEventListener('loadstart', function (evt) {
        if (evt.url.indexOf(endUrl) == 0) {
            // close the browser, we are done!
            var url_string = evt.url.replace('#', '?');
            var url = new URL(url_string);
            var access_token = url.searchParams.get("access_token");
            localStorage.setItem('access_token', access_token);
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + localStorage.getItem('access_token'));
            browser.close();
        }
    });
    browser.addEventListener('loaderror', function (err) {
        console.log("error " + err);
    });
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