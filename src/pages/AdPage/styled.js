import styled from 'styled-components';

export const Fake = styled.div`
    background-color:#ddd;
    height:${props=>props.height || 20}px;
`;

export const PageArea = styled.div`
display:flex;
margin-top:20px;

    .box{
        background-color:#fff;
        border-radius:5px;
        box-shadow:0px 0px 4px #999;
        margin-bottom:20px;
    }
    
    .box--padding{
        padding:10px;
    }
    .leftSide{
        flex:1;
        margin-right:20px;

        .box{
            display:flex;
        }
        .adImage{
            width:320px;
            height:320px;
            marign-right:20px;

            .each-slide img{
                display:flex;
                align-items:center;
                justify-content:center;
                background-size:cover;
                height:320px;
            }
        }
        .info{
            flex:1;
            padding-left:15px;

            .adName{
                margin-bottom:20px;

                h2{
                    margin:0;
                    margin-top:20px;
                }

                small{
                    color:#999;
                }
            }

            .adDescription{
                small{
                    color:#999;
                }
            }
        }
    }
    .rightSide{
        width:250px;
    }
}

`;