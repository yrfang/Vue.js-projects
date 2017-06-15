var demo = new Vue({
    el: '#app',
    data: {
        // The layout mode, possible values are "grid" or "list".
        layout: 'list',

        articles: [{
            "title": "Superhero 做自己人生裡的超級英雄",
            "image": "https://unsplash.it/400/300?image=1051"
        },
        {
            "title": "Free 偶爾迷糊，換得自在",
            "image": "https://unsplash.it/400/300?image=1042"
        },
        {
            "title": "Small 世界多大，我們多渺小；看遠一點，就不計較了",
            "image": "https://unsplash.it/400/300?image=1049"
        },
        {
            "title": "World 世界是一本書，不旅行的人只讀了一頁",
            "image": "https://unsplash.it/400/300?image=1015"
        },
        {
            "title": "Travel 旅行是唯一讓你花了錢卻變得更富有的東西",
            "image": "https://unsplash.it/400/300?image=988"
        },
        {
            "title": "Run 訓練最痛苦的部分，就是一開始穿上鞋子的那一刻",
            "image": "https://images.unsplash.com/photo-1470850364367-9a570ba95492?dpr=1.100000023841858&auto=compress,format&fit=crop&w=767&h=573&q=80&cs=tinysrgb&crop=&bg="
        }]

    }
});
