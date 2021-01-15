<template>
    <div class="header">
        <div class="nav-topber">
            <div class="container">
                <div class="topber-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MIUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topber-user">
                    <a href="javascript:;">登录</a>
                    <a href="javascript:;">注册</a>
                    <a href="javascript:;" class="my-cart"><span class="icon-cart"></span>购物车</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                     <div class="item-menu">
                        <span>RedMi红米</span>
                    </div>
                     <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img"><img src="/imgs/nav-img/nav-1.png" alt=""></div>
                                        <div class="pro-name">小米CC9</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text">
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'nav-header',
}
</script>

<style lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';

    .header{
        .nav-topber{
            height: 39px;
            line-height: 39px;
            background: #333333;
            color: #b0b0b0;
            .container{
                
                a{
                    display: inline-block;
                    color: #b0b0b0;
                    margin-right: 17px;
                }
                .my-cart{
                    width: 110px;
                    background-color: #ff6600;
                    text-align: center;
                    color: #fff;
                    .icon-cart{
                        display: inline-block;
                        width: 16px;
                        height: 12px;
                        background: url('/imgs/icon-cart-checked.png') no-repeat center;
                        background-size: contain;
                        margin-right: 4px;
                    }
                }
            }
        }
        .nav-header{
            .container{
                position: relative;
                height: 112px;
                // logo
                .header-logo{
                    display: inline-block;
                    width: 55px;
                    height: 55px;
                    background: #FF6600;
                    a{
                        display: inline-block;
                        width: 110px;
                        height: 55px;
                        &:before{
                            content: '';
                            @include bgimg(55px,55px,'/imgs/mi-logo.png',55px);
                             transition: margin 0.4s;
                        }
                        &:after{
                            content: '';
                             @include bgimg(55px,55px,'/imgs/mi-home.png',55px);
                        }
                        &:hover:before{
                            margin-left: -55px;
                            transition: margin 0.4s;
                        }
                    }
                }
                // 菜单
                .header-menu{
                    width:640px;
                    padding-left: 209px;
                    .item-menu{
                        display: inline-block;
                        color: #333;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 112px;
                        margin-right: 20px;
                        
                        span{
                            cursor: pointer;
                        }
                        &:hover{
                             color:$colorA;
                             .children{
                                height:220px;
                                opacity:1;
                                box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                             }
                        }
                        .children{
                           position: absolute; 
                           top: 112px;
                           left: 0;
                           opacity: 0;
                           overflow: hidden;
                           z-index: 10;
                           width: 1126px;
                           height: 0;
                           transition:all .5s;
                           border-top: 1px solid #E5E5E5;
                           
                           
                            .product{
                                position: relative;
                                float: left;
                                width: 16.6%;
                                height: 220px;
                                font-size:12px;
                                line-height:12px;
                                text-align: center;
                                a{
                                    display: inline-block;
                                }
                                img{
                                    width: auto;
                                    height: 111px;
                                    margin-top: 26px;
                                }
                                 .pro-img{
                                    height:137px;
                                }
                                .pro-name{
                                    font-weight:bold;
                                    margin-top:19px;
                                    margin-bottom:8px;
                                    color:$colorB;
                                }
                                .pro-name{
                                    color:$colorA;
                                }
                                &::before{
                                    content: '';
                                    position: absolute;
                                    top: 28px;
                                    right: 0;
                                    border-left:1px solid $colorF;
                                    height:100px;
                                    width:1px;
                                }
                                &:last-child:before{
                                    display: none;
                                }
                            }
                        }
                    }
                }
                // 搜索框
                .header-search{
                    width: 319px;
                    .wrapper{
                        height: 50px;
                        border: 1px solid #e0e0e0;
                        display: flex;
                        align-items: center;
                        input{
                            box-sizing: border-box;
                            border: none;
                            border-right: 1px solid #e0e0e0;
                            width: 264px;
                            height: 50px;
                            padding-left:14px;
                        }
                        a{
                            @include bgimg(18px,18px,'/imgs/icon-search.png',);
                            margin-left: 17px;
                        }
                    }
                }
            }
        }
    }
</style>