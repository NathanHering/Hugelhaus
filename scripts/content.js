class Content {
    constructor(data = {}){
        this.div = document.getElementById("content")
        window.addEventListener('resize',()=>{
            this.resize()
        })
        this.root = "Hugelhaus"
        this.post = null
    }

    home(){
        window.location = window.location.pathname
    }

    route(id = false){
        let post = false
        if (id) {
            window.location = `${window.location.pathname}?id=${id}`
        }

        const args = this.getUrlArgs()
        if (args.search && args.count == 0){
            window.location = window.location.pathname
            return
        } else if (!args.search) {
            this.src = "./posts/home.js"
            return
        }

        post = this.getPost(args.id)
        this.post = post
        if (!post){
            window.location = window.location.pathname
        } else {
            this.src = post.src
        }
    }

    getUrlArgs(){
        let args = {
            search: false,
            count: 0
        }
        let props = ['id']
        const search = window.location.search.substring(1)

        if (search != ""){
            args.search = true
            search.split('&').forEach((n) => {
                let arg = n.split('=')
                if (props.includes(arg[0])){
                    args.count++
                    args[arg[0]] = arg[1]
                }
            })
        }
        
        return args
    }

    getPost(id){
        let post = false
        posts.forEach((p => {
            if (p.id === parseInt(id)){
                post = p
            }
        }))
        return post
    }

    set innerHTML(html){
        let container = document.createElement('div')
        container.classList.add('container')
        container.innerHTML = html

        this.div.appendChild(container)
        this.buildSlides()
        this.resize()
        if(this.post)
        {
            this.addTagsSection(container)
            // this.addCommentsSection(container)
        }
    }

    set src(src){
        this.div.innerHTML = null
        this.removeContentScriptElement()
        this.addContentScriptElement(src)
    }

    removeContentScriptElement(){
        let old = document.getElementById('content-script')
        if (old) old.remove()
    }

    addContentScriptElement(src){
        let ele = document.createElement('script')
        ele.setAttribute('type','text/javascript')
        ele.setAttribute('src',src)
        ele.setAttribute('id','content-script')
        document.querySelector('head').appendChild(ele)
    }

    addTagsSection(container){
        let ele = document.createElement('fieldset')
        ele.classList.add('tags')

        let legend = document.createElement('legend')
        legend.classList.add('legend')
        legend.innerText = 'TAGS'
        ele.appendChild(legend)

        this.post.tags.forEach((t) => {
            let tag = document.createElement('div')
            tag.classList.add('tag')
            tag.innerText  = t
            ele.appendChild(tag)
        })
        container.appendChild(ele)
    }

    // addCommentsSection(container)
    // {
    //     let ele = document.createElement('fieldset')
    //     ele.classList.add('comments')

    //     let legend = document.createElement('legend')
    //     legend.classList.add('legend')
    //     legend.innerText = 'COMMENTS'
        
    //     ele.appendChild(legend)
    //     ele.appendChild(this.commentInput)
    //     ele.appendChild(this.commentSaveButton)
    //     ele.appendChild(this.commentsDiv)

    //     container.appendChild(ele)
    //     this.loadComments()
    // }

    // get commentInput()
    // {
    //     let txtArea = document.createElement('textarea')
    //     txtArea.id = 'newComment'
    //     txtArea.classList.add('comment')
    //     if (funtilityApi.userIsSignedIn)
    //     {
    //         txtArea.placeholder = 'Care to comment'
    //     } else {
    //         funtilityApi.signOut
    //         txtArea.placeholder = 'You must be signed in to comment.'
    //         txtArea.setAttribute('disabled', true)
    //     }
    //     return txtArea
    // }

    // get commentSaveButton()
    // {
    //     if (funtilityApi.userIsSignedIn)
    //     {
    //         let btn = document.createElement('button')
    //         btn.classList.add('save-comment')
    //         btn.innerText = 'Save Comment'
    //         btn.addEventListener('click', () => {
    //             this.saveComment()
    //         })
    //         return btn
    //     } else {
    //         return document.createElement('div')
    //     }
    // }

    // saveComment()
    // {
    //     let body = this.saveCommentBody()
    //     if (body)
    //     {
    //         let commentsDiv = document.getElementById('comments')
    //         funtilityApi
    //             .POST('Hugelhaus/Comment',body)
    //             .then((res) => {
    //                 commentsDiv.prepend(this.comment(res.result))
    //             })
    //     }
    // }

    // saveCommentBody()
    // {
    //     let commentEle = document.getElementById('newComment')
    //     if(!this.post || !this.post.id || !commentEle.value) {
    //         return {}
    //     } else {
    //         let result = {
    //             'Id': 0,
    //             'UserPublicId': '',
    //             'PostId': `${this.post.id}`,
    //             'TimeStamp': '',
    //             'Content': commentEle.value
    //         }
    //         commentEle.value = ''
    //         return result 
    //     }
    // }

    // get commentsDiv()
    // {
    //     let result = document.createElement('div')
    //     result.id = 'comments'
    //     return result
    // }

    // loadComments()
    // {
    //     let commentsDiv = document.getElementById('comments')
    //     funtilityApi
    //         .GET('Hugelhaus/Comments',[['postId',this.post.id]])
    //         .then((res) => {
    //             res.result.sort(this.compareComment)
    //             res.result.forEach((comment) => {
    //                 commentsDiv.appendChild(this.comment(comment))
    //             })
    //         })
    // }

    // compareComment(a,b)
    // {
    //     if(a.commentId < b.commentId) return 1
    //     if(a.commentId > b.commentId) return -1
    //     return 0
    // }

    // comment(comment)
    // {
    //     let container = document.createElement('div')
    //     container.id = comment.commentId
    //     container.classList.add('comment')

    //     let name = document.createElement('div')
    //     name.classList.add('name')
    //     name.innerText = comment.userName
    //     container.appendChild(name)

    //     let time = document.createElement('div')
    //     time.classList.add('time')
    //     time.innerText= this.parseTimeStamp(comment.timeStamp)
    //     container.appendChild(time)

    //     let text = document.createElement('div')
    //     text.classList.add('comment-content')
    //     text.innerText = comment.content
    //     container.appendChild(text)

    //     container.dataset.comment = JSON.stringify(comment)
    //     return container
    // }

    // parseTimeStamp(timeStamp)
    // {
    //     let n = timeStamp.split('-')
    //     let mnth = Number(n[1]) - 1
    //     let date = new Date(Date.UTC(n[0],mnth,n[2],n[3],n[4])).toString()
    //     let l = date.split(' ')
    //     let t = l[4].split(':')
    //     return `${l[0]} ${l[1]} ${l[2]} ${l[3]}`
    // }

    resize(){
        let container = document.querySelector('.container')
        let w = container.clientWidth - 4
        document.querySelectorAll('.slides')
            .forEach((e) => {
                this.fitCaption(e,w)
            })
    }

    fitCaption(caption,width){
        caption.style.width = `${width}px`
        caption.querySelector('img').style.width = `${width}px`
    }

    buildSlides(){
        document.querySelectorAll('.slides')
        .forEach(slide => {
            new Slide({
                root: this.root,
                ele: slide
            })
        });
    }
}

class Slide {
    constructor(data = {})
    {
        this.ele = data.ele
        this.left
        this.right
        this.img
        this.caption
        this.sources = JSON.parse(this.ele.dataset.sources)
        this.localPath = this.sources[0][0]
        this.currentIndex = 0
        this.buildPresentationElements()
        this.changeSource()
    }

    buildPresentationElements()
    {
        if (this.sources.length > 1)
        {
            this.buildLeftNav()
            this.buildRightNav()
        }

        this.img = document.createElement('img')
        this.ele.appendChild(this.img)

        this.caption = document.createElement('div')
        this.caption.classList.add('caption')
        this.ele.appendChild(this.caption)
    }

    buildLeftNav()
    {
        this.left = document.createElement('div')
        this.left.classList.add('left')
        this.left.innerText = "<"
        this.left.addEventListener('click',()=>{
            this.previous()
        })
        this.ele.appendChild(this.left)
    }
    
    previous()
    {
        if (this.currentIndex > 0){
            this.currentIndex--
        } else {
            this.currentIndex = this.sources.length - 1
        }
        this.changeSource()
    }

    buildRightNav()
    {
        this.right = document.createElement('div')
        this.right.classList.add('right')
        this.right.innerText = ">"
        this.right.addEventListener('click',()=>{
            this.next()
        })
        this.ele.appendChild(this.right)
    }

    next()
    {
        if (this.currentIndex < this.sources.length - 1){
            this.currentIndex++
        } else {
            this.currentIndex = 0
        }
        this.changeSource()
    }

    changeSource()
    {
        this.img.src = `${this.Host}${this.sources[this.currentIndex][0]}`
        this.caption.innerText = this.sources[this.currentIndex][1]
    }

    /**
     * This detects if the window location is local for development
     * purposes or hosted on a server. If it's hosted the location.host
     * will be the hosted location on the server. If not, it will build
     * the local path to the repo.
     */
    get Host()
    {
        return window.location.host ? `http://${window.location.host}` : `${window.location.origin}${window.location.pathname.replace('/index.html','')}`
    }
}
