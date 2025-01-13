import styles from "./CartPage.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cart from "../../components/Cart/Cart";

function CartPage({ children }) {
    return (
        <div>
            <Header/>
            <div className={styles.page}>
                <header className={styles.header}>My Cart</header>
                <div className={styles.cartContainer}>
                    <Cart />
                </div>
                <footer className={styles.footer}>Happy Shopping!</footer>
            </div>
            <Footer/>
        </div>
    );
}

export default CartPage;