const API_KEY = "51d17d37b7ea42d2a8e41f34d47a1ee4"
        const url = "https://newsapi.org/v2/everything?q="

        window.addEventListener('load', () => fetchNews("India"))

        async function fetchNews(query) {
            const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
            const data = await res.json()
            bindData(data.articles)
        }

        function bindData(articles) {
            const cardsContainer = document.getElementById('cards-container')
            const newsCardTemplate = document.getElementById('template-new-card')

            cardsContainer.innerHTML = ''

            articles.forEach(article => {
                if (!article.urlToImage) return
                const cardClone = newsCardTemplate.content.cloneNode(true)
                fillDataInCard(cardClone, article)
                cardsContainer.appendChild(cardClone)
            });
        }

        function fillDataInCard(cardClone, article) {
            const NewsImg = cardClone.querySelector('#news-img')
            const NewsTittle = cardClone.querySelector('#news-tittle')
            const NewsSource = cardClone.querySelector('#news-source')
            const NewsDescription = cardClone.querySelector('#news-desc')

            NewsImg.src = article.urlToImage
            NewsTittle.innerHTML = article.title
            NewsDescription.innerHTML = article.description

            const DaTa = new Date(article.publishedAt).toLocaleString("en-US", {
                timeZone: "Asia/jakarta"
            })

            NewsSource.innerHTML = `${article.source.name} ৹ .${DaTa}`

            cardClone.firstElementChild.addEventListener('click', () => {
                window.open(article.url, "_blank")
            })
        }

        let curSelectedNav = null
        function onNavItemClick(id) {
            fetchNews(id)
            const navItems = document.getElementById(id)
            curSelectedNav?.classList.remove('active')
            curSelectedNav = navItems
            curSelectedNav.classList.add('active')
        }

        const SearchText = document.getElementById('search-text')
        const SearchButton = document.getElementById('search')

        console.log(SearchButton);

        SearchButton.addEventListener('click', () => {
            // let srh = SearchText.value 

            if(SearchText.value < 1){
                alert("Please search your News!")
            }
            else{

            
            // fetchNews(srh)
            const query = SearchText.value
            if (!query) return
            fetchNews(query)
            curSelectedNav?.classList.remove('active')
            curSelectedNav = null 

            slide.classList.remove('slide')
            view.classList.remove('view')}

        })

           // Disposable design layout start

        const menu = document.getElementById('Menu')
        const slide = document.getElementById('slide')
        const view = document.getElementById('view')

        menu.addEventListener('click', ()=>{
            menu.style.transform = "rotate(360deg)"
            slide.classList.toggle('slide')
            view.classList.toggle('view')
        })

        document.querySelectorAll('.hover-links').forEach(links => 
        links.addEventListener('click', () =>{
            slide.classList.remove('slide')
            view.classList.remove('view')
                
        }))
