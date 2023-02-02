import Admin from '../../components/admin/Index.js'
import Financial from '../../components/admin/Financial'
const Main = (props) => {
    return <Admin authentication={props.authentication}  childrenName="financial">
        <Financial />
    </Admin>
}
export default Main