import React from "react";
import axios from "axios";
import { ExternalLink } from 'react-external-link';

class App extends React.Component {
    state = {
        articles: [],
        isLoading: true,
        errors: null
    };

    getArticles() {
        axios
            .get(
                "https://newsapi.org/v2/everything?q=health&sortBy=publishedAt&apiKey=cf5ee05c372a4d468ad06e2583a6e1c1"
            )
            .then(response => {
                return response.data.articles.map(article => ({
                    date: `${article.publishedAt}`,
                    title: `${article.title}`,
                    author: `${article.author}`,
                    description: `${article.description}`,
                    url: `${article.url}`
                }));
            })
            .then(articles => {
                this.setState({
                    articles,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getArticles();
    }

    render() {
        const { isLoading, articles } = this.state;
        return (
            <>

                <div className="p-3 mb-2  ">

                    <div className="container">

                        <div>
                            <h1 className="text-center m-3" >News</h1>




                            <div>
                                {!isLoading ? (
                                    articles.map(article => {
                                        const { date, title, author, description, url } = article;
                                        return (

                                            <div key={title}>

                                                <div className="my-3 aboutjust" style={{ backgroundColor: 'rgba(228, 227, 227, 0.778)' }}>

                                                    <div className="p-4">

                                                        <h4 className="fw-bold mb-3" >{title}</h4>
                                                        <h6>{author} : {date} </h6>


                                                        <h5 className="aboutjust">{description}</h5>

                                                        <ExternalLink href={url}>
                                                            <h6>Read more</h6>
                                                        </ExternalLink>


                                                    </div>
                                                </div>


                                            </div>
                                        );
                                    })
                                ) : (
                                    
                                    <div>
                                        {/* <p>Loading...</p> */}
                                        <h1 className="text-center m-3" >Loading...</h1>
                                    </div>
                                    
                                )}
                            </div>







                        </div>

                    </div>

                </div>

            </>
        );
    }
}
export default App;


