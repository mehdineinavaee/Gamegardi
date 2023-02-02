import Admin from '../../components/admin/Index.js'
import GamesList from '../../components/admin/CommentsList'
const Main = (props) => {
    return <Admin authentication={props.authentication}  childrenName="comments">
        <GamesList authentication={props.authentication} />
    </Admin>
}
export default Main