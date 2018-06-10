export const LocalConfig = {
    versioning: [
        {
            platform: 'android',
            isLastVersion: true,
            isMandatoryUpdate: false,
            storeLink: ''
        },
        {
            platform: 'ios',
            isLastVersion: true,
            isMandatoryUpdate: false,
            storeLink: ''
        }
    ],
    backend: {
        environment: 'PROD',
        baseUrl: 'https://webportal-acc.consilium.europa.eu/cixp/ws',
        api : [
            {
                name : 'credentials',
                method: 'POST',
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: '/authentication/credentials'
            },
            {
                name : 'eventCode',
                method: 'POST',
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: '/authentication/eventCode'
            },
            {
                name : 'public',
                method: 'POST',
                url: '/authentication/public'
            },
            {
                name : 'getAccessToken',
                method : 'POST',
                url : '/authentication/getAccessToken'
            },
            {
                name : 'getUserProfile',
                method: 'POST',
                url : '/core/graphql'
            },
            {
                name : 'getAllMeetings',
                method: 'POST',
                url : '/core/graphql'
            },
            {
                name : 'getMyMeetings',
                method: 'POST',
                url : '/core/graphql'
            },
            {
                name : 'getMeetingsDetails',
                method: 'POST',
                url : '/core/graphql'
            },
            {
                name : 'meetingAgenda',
                method: 'POST',
                url : '/core/graphql'
            },
            {
                name : 'getPoi',
                method: 'GET',
                url: '/council-app/poi'
            },
            {
                name : 'getInfoCorner',
                method: 'GET',
                url: '/council-app/infocorner'
            },
            {
                name : 'getLatestPush',
                method: 'GET',
                url: '/council-app/notifications/latest'
            },
            {
                name : 'loginToken',
                method: 'POST',
                url: '/council-app/delegates-portal/loginToken'
            }
        ]
    },
    loggerLevel: 'DEBUG',
    devMode: false,
    externalUrls: {
        councilWebsite: 'http://www.consilium.europa.eu/',
        delegatePortal: 'https://delegates.consilium.europa.eu/',
        feedback: 'https://ec.europa.eu/eusurvey/runner/EUCAPP',
        forgotPassword: 'https://delegates.consilium.europa.eu/index.html?targetPath=public/controller/passwordReset:showRequestPasswordResetPage',
        newsRoom: 'https://tvnewsroom.consilium.europa.eu/',
        privacyPolicy: 'https://delegates.consilium.europa.eu/privacy/eucouncil.html',
        social : {
            facebook: 'https://www.facebook.com/eucouncil',
            twitter: 'https://twitter.com/eucouncil',
            instagram: 'https://www.instagram.com/eucouncil/',
            youtube: 'https://www.youtube.com/user/eucouncil',
            googlePlus: 'https://plus.google.com/+eucouncil'
        },
        votingCalculator: {
            android: 'https://play.google.com/store/apps/details?id=eu.europa.publications.consilium.votingcalculator',
            ios: 'https://itunes.apple.com/us/app/council-voting-calculator/id1013810620?mt=8'
        }
    }
}
