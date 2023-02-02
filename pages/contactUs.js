import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from "next/link";
//Icons
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/MailOutline';

export default function ContactUs({ isMobile }) {
  return <>
    <div style={{ "margin-top": "15px", "margin-right": "10px" }}>
      <Typography variant="h6" component="div" gutterBottom>
        راه‌های ارتباط با ما
      </Typography>
      <div style={{ height: "250px" }}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WhatsAppIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="0919-4393-703" secondary="فقط از طریق واتس‌اپ" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <InstagramIcon />
              </Avatar>
            </ListItemAvatar>
            <Link href={'https://instagram.com/gamegardi.ir/'}>
              <a>https://instagram.com/gamegardi.ir</a>
            </Link>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="info@blog.gamegardi.com" />
          </ListItem>
        </List>
      </div>
    </div>

  </>
}
