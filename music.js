$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)
// phần slide
var couter = 1;
setInterval(function(){
document.getElementById('radio' + couter).checked = true;
couter++;
if(couter > 5) {
    couter = 1;
}
}, 3000);
// két thúc slide
// phần control
var play = $('.btn_play')
var pause = $('.btn_pause')
var repeat = $('.btn_repeat')
var random = $('.btn_random')
var audio = $('#audio')
const header = $('.playing h2')
const cd_theme = $('.cd')
const progress = $('#progress')
const btn_next = $('.btn_next')
const btn_aback = $('.btn_aback')
var blockTime = $('.time_song')
var blockTotolTime = $('.totolTimeSong')
var btn_listSong = $('.list_song')
var song_duration
var percenProgress;
var rewind ;
var randomSong = false
var loop = false
// kết thúc control
// render list-song
var app = {
    currentIndex: 0,
     list_song: [
        {
            name:'NEVEDA',
            singer:'Vicetone',
            img:'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/2/3/1/1/2311971204a1e383f86c97706a8ecda9.jpeg',
            path: './music/Nevada - Vicetone_ Cozi Zuehlsdorff.mp3'
        },
        {
            name:'THAY LÒNG',
            singer:'NAL x TVK x Truzg',
            img:'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/f/c/2/8/fc28119fe63bad8efc51cdb1f2d13a69.jpg',
            path: './music/Thay Long - DIMZ_ TVk_ NH4T.mp3'
        },
        {
            name:'Đen - một triệu like',
            singer:'ĐEN VÂU',
            img:'./img/anhbh3.jpg',
            path: './music/Mot Trieu Like - Den_ Thanh Dong.mp3'
        },
        {
            name:'Dancing With Your Ghost',
            singer:'Sasha Alex Sloan',
            img:'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/7/4/7410709019fd4a836c843898293cbf0a_1487171464.jpg',
            path: './music/Dancing With Your Ghost - Sasha Sloan.mp3'
        },
        {
            name:'Unstoppable',
            singer:'Sia',
            img:'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/d/1/d170e3fda75ec7afe19b1e01df3fce8a_1453722113.jpg',
            path: './music/Unstoppable - Sia.mp3'
        },
        {
            name:'EM LÀ CON THUYỀN CÔ ĐƠN',
            singer:'THÁI HỌC',
            img:'https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/b/5/c/f/b5cfe3d54669f19af4618cc5b9bc654e.jpg',
            path: './music/Em La Con Thuyen Co Don - Thai Hoc.mp3'
        },
        {
            name:'YÊU LÀ CƯỚI',
            singer:'THÁI HỌC',
            img:'https://data.chiasenhac.com/data/cover/147/146033.jpg',
            path: './music/Yeu La Cuoi - Phat Ho.mp3'
        },
        {
            name:'WE CAN KISS FOREVER ?',
            singer:'Kina; Adriana Proenza',
            img:'https://data.chiasenhac.com/data/cover/114/113297.jpg',
            path: './music/Can We Kiss Forever_ - Kina_ Adriana Pro.mp3'
        },
        {
            name:'So Far Away',
            singer:'Martin Garrix; David Guetta; Jamie Scott; Romy Dya',
            img:'https://data.chiasenhac.com/data/cover/80/79755.jpg',
            path: './music/So Far Away - Martin Garrix_ David Guett.mp3'
        },
        {
            name:'Wake Me Up',
            singer:'Avicii; Aloe Blacc',
            img:'https://data.chiasenhac.com/data/cover/39/38156.jpg',
            path: './music/Wake Me Up - Avicii_ Aloe Blacc.mp3'
        },
        {
            name:'Darkside',
            singer:'Alan Walker; Tomine Harket; Au/Ra',
            img:'https://data.chiasenhac.com/data/cover/93/92002.jpg',
            path: './music/Darkside - Alan Walker_ Tomine Harket_ A.mp3'
        },
        {
            name:'Shirfine - Illusionary Daytime',
            singer:'[Zuaste & AlexDy Remix]',
            img:'https://i1.sndcdn.com/avatars-Jx7TTvtyePMSQUeh-m7vMsQ-t200x200.jpg',
            path: './music/Shirfine - Illusionary Daytime (Zuaste & AlexDy Remix).mp3'
        },
        {
            name:'Star Sky',
            singer:'Two Steps From Hell',
            img:'https://i1.sndcdn.com/artworks-zehtGo2LjRIK-0-t500x500.jpg',
            path: './music/Two Steps From Hell - Star Sky.mp3'
        },
        {
            name:'Umbrella',
            singer:'Ember Island | Matte Remix',
            img:'https://i1.sndcdn.com/avatars-000352628591-7yfl5f-t200x200.jpg',
            path: './music/Ember Island - Umbrella (Matte Remix).mp3'
        },
        {
            name:'Perfect',
            singer:'Ed Sheeran',
            img:'https://i1.sndcdn.com/avatars-eeWwbXzGfLZh6hbR-j37t1g-t200x200.jpg',
            path: './music/Perfect - Ed Sheeran.mp3'
        },
        {
            name:'不过人间 ',
            singer:'海来阿木',
            img:'https://i1.sndcdn.com/artworks-uJQkGeW98em1jlbG-ndcniA-t500x500.jpg',
            path: './music/BẤT QUÁ NHÂN GIAN (ThanhKT Remix)不过人间-海来阿木.mp3'
        },
        {
            name:'赤伶',
            singer:'执素兮',
            img:'https://i1.sndcdn.com/avatars-000734859046-r4m7d1-t200x200.jpg',
            path: './music/Xích Linh - Chấp Tố Hề -- 赤伶 - 执素兮.mp3'
        }
    
    ],
    defineProperties: function() {
        Object.defineProperty(this, 'current_song', {
            get: function() {
                return this.list_song[this.currentIndex]
            }
        })
    },
    get_songDuration: function() {
        return new Promise(function(resolve) {
            audio.onloadedmetadata = function() {
                song_duration = audio.duration
                resolve(song_duration)
            }
        })
    },
    render: function() {
        var html = this.list_song.map(function(song, index) {
            return `<li class="song ${index === app.currentIndex ? 'test1' : ''}" data-id = "${index}">
            <img src="${song.img}" alt="">
            <div class="singer_song">
                <h3>${song.name}</h3>
                <p>${song.singer}</p>
            </div>
            <div class = "options">
             <i class="fas fa-ellipsis-h"></i>
            </div>
        </li>`
        })
        var hienthi = $('.list_song ul')
        hienthi.innerHTML = html.join('')
    },
    handleEvent: function() {
        var open_seting = $('.seting')
        var option_seting = $('.option_seting')
        var text_seting = $('.text-seting')
        var slideview = $('.slide_view')
        var slideview_height = slideview.offsetHeight
        var slideview_width = slideview.offsetWidth
       document.onscroll = function() {
           var scrolltop = Math.round(document.documentElement.scrollTop) || Math.round(window.scrollY)
           var new_slideview_height = slideview_height - scrolltop
           var new_slideview_width = slideview_width - scrolltop
           slideview.style.height = new_slideview_height > 0 ? new_slideview_height + 'px' : 0
           slideview.style.width = new_slideview_width > 0 ? new_slideview_width + 'px' : 0
           slideview.style.opacity = new_slideview_height/slideview_height
       }
       open_seting.onclick = function() {
           open_seting.classList.toggle('text_header_hover')
           option_seting.classList.toggle('hien')
           
       }
       option_seting.onclick = function(e) {
           e.stopPropagation()
       }
       // xử lý check_quality
       var quality = $$('.qualyty li')
       var check_quality = $$('.check_box')
       quality.forEach((e,index)=> {
           var check = check_quality[index]
           e.onclick = function() {
              $('.check_box.check_quality').classList.remove('check_quality')
              check.classList.add('check_quality')
           }
       })
        //    xử lý quay cd 
         var cd_quay = cd_theme.animate([
            {transform: 'rotate(360deg)'}
         ],{
             duration: 5000,
             iterations: Infinity
         })
         cd_quay.pause()
        // xử lý thao tác play,pause, repeat...  
        play.onclick = function() {
            play.style.display = 'none'
            pause.style.display = 'block'
            audio.play()
            cd_quay.play()
        }
        
        pause.onclick = function() {
            pause.style.display = 'none'
            play.style.display = 'block'
            audio.pause()
            cd_quay.pause()
            
        }
        repeat.onclick = function() {
            repeat.classList.toggle('test')
            if(!loop) {
                audio.loop = true
                loop = true
            } else {
                audio.loop = false
                loop = false
            }
        
        }
        // random bài hát
        random.onclick = function() {
            if(!randomSong) {
                random.classList.add('test')
                randomSong = true
            }          
            else {
                random.classList.remove('test')
                randomSong = false
            }
        }
       
       // 
    // xử lý click next, aback
    btn_next.onclick = function() {
        if(randomSong) {
            app.random_song()
        }else{
            app.next_song()
        }       
    }
    btn_aback.onclick = function() {
        if(randomSong) {
            app.random_song()
        }else{
            app.aback_song()
        }   
    }
    

    },
    // xử lý khi click vào  bài hát
    click_song: function() {
       btn_listSong.onclick = function(e) {
           const songNode = e.target.closest('.song:not(.test)')
           if(songNode || e.target.closest('.option')) {
               if(songNode) {
                   app.currentIndex = Number(songNode.dataset.id)
                   app.render()
                   app.load_currentsong()               
               }
           }
       }
    },
    formatTime: function(sec_num) {
        var minutes = Math.floor(sec_num/60)
        var secondes = Math.floor((sec_num  - minutes*60))
        if(secondes < 10) {
            secondes = '0' + secondes
        }
        if(minutes < 10) {
            minutes = '0' + minutes
        }
        return minutes + ':' + secondes
    },
    update_Timesong: function() {
        audio.ontimeupdate = function() {
            if(song_duration) {
                percenProgress = Math.floor((audio.currentTime/song_duration) *100)
                progress.value = percenProgress
                const time1 = app.formatTime(audio.currentTime)
                blockTime.innerText = time1
            }  
           }
           progress.onchange = function(e) {
               
               rewind =(e.target.value * song_duration)/100
               audio.currentTime = rewind         
           }
    },
    auto_nextSong: function() {
        audio.onended = function() {
            if(randomSong) {
                app.random_song()
            } else {
                app.currentIndex++
                if(app.currentIndex > app.list_song.length -1) {
                    app.currentIndex = 0
                }
                app.render()
                app.load_currentsong()
                app.scrollSong()
            }
        }
    },
    next_song: function() {
        this.currentIndex++
        if(this.currentIndex > (this.list_song.length - 1)) {
            this.currentIndex = 0
        }
        this.render()
        this.load_currentsong()
        app.scrollSong()
        
    },
    // random song
    random_song: function() {
        var indexRandom 
        do {
            indexRandom = Math.floor(Math.random() * (this.list_song.length))
        } while(this.currentIndex === indexRandom)
        this.currentIndex = indexRandom
        app.render()
        this.load_currentsong()
        app.scrollSong()
    },
    aback_song: function() {
        this.currentIndex--
        if(this.currentIndex < 0 ) {
            this.currentIndex = this.list_song.length - 1
        }
        this.render()
        this.load_currentsong()
        app.scrollSong()
    },
    scrollSong: function() {
        setTimeout(() => {
            $('.song.test1').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 300);
    },
    load_currentsong: function() {
        header.innerText = this.current_song.name
        cd_theme.style.backgroundImage = `url('${this.current_song.img}')`
        audio.src =  `${this.current_song.path}`
        if(play.style.display == 'none') {
            audio.play()
        } else {
            audio.pause()
        }
        this.get_songDuration().then(function(time) {
            const time2 = app.formatTime(time)
            blockTotolTime.innerText = time2
        })
    },
    start: function() {
        this.defineProperties()
        this.handleEvent()
        this.render()
        this.load_currentsong()
        this.update_Timesong()
        this.auto_nextSong()
        this.click_song()
    }
}
app.start()
 





 
 