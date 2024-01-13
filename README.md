<div align="center">
  <h1>Welcome to YourMet</h1>
  <a href="https://yourmet.vercel.app/" target="_blank">Live Site</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.linkedin.com/posts/sangyeonpak_programming-softwaredeveloper-webdevelopment-activity-7064345572396163073-XB6Y?utm_source=share&utm_medium=member_desktop" target="_blank">Video Demo</a>
</div>

<br>

Welcome to YourMet, a full-stack project with a responsive design created using the New York Metropolitan Museum of Art's public API.

It is designed as if the Met's website has a personal login page for you to create your own personal gallery with works that are currently displayed in the Met.

<img src="https://cdn.filestackcontent.com/emQPsQFR5WzSVsArToKU"></img>

<h3>Additionally, you can:</h3>

<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>mark artworks as "seen" if you have physically seen them while visiting the Met <br />
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>share your gallery with friends (or share your friends' galleries with others) <br />
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>customize your account <br />
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>access the website from your mobile devices
<h3>Regarding your data:</h3>

<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Users are authenticated through Auth0 with whatever email they choose to log-in with. Integrated Google sign-in is available for convenience.  <br />
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Your gallery, seen artworks, and your account customizations are saved in a PostgreSQL database. <br />
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Your log-in email is saved in this database to determine which artworks are yours. Your log-in password is NOT saved in this database. They are managed by Auth0's industry-standard security practices.<br />
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Your email is never shared or displayed on the website. <br />

<hr>
<h3>Road Map</h3>

<h4>Version 0</h4>
<a href="https://github.com/sangyeonpak/hackathon" target="_blank">https://github.com/sangyeonpak/hackathon</a><br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>The project was actually called Shelf and was supposed to use Spotify's API to display albums that you have a physical medium of. You'd put them on your "Shelf" and keep a list of vinyls/CDs/tapes to keep track of what you have at home, sort of like Discogs.

<h4>Version 1</h4>
<a href="https://github.com/sangyeonpak/frontend-project" target="_blank">https://github.com/sangyeonpak/frontend-project</a><br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Version 1 came about when I realized Spotify's API was too dificult to understand (I just started learning how to code) and had to choose another API quickly for Galvanize's (coding bootcamp) first big project (frontend project). I chose the Met's API from GitHub's list of public APIs and formed my central idea: YourMet. It featured the main point of the website: to display your personal gallery and mark them as seen or not. However, the ultimate idea was to let users login to their page and share their galleries with their friends, but I was still far from being able to do that.<br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>The project was done through jQuery and using snippets of Bootstrap. It's all just frontend logic so if you put artworks into your gallery, artworks won't persist.<br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>The style was radically different; I tried to go for an inverted theme of the Met's actual website to the best of my abilities at the time while also trying to meet a deadline.<br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>The most profound thing was learning how to use values to put a picture in correct containers (event.target)<br/>

<h4>Version 2</h4>
<a href="https://github.com/sangyeonpak/yourmet/tree/master/yourmet-react" target="_blank">https://github.com/sangyeonpak/yourmet/tree/master/yourmet-react</a><br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Version 2 is when I converted Version 1 into React and implemented a working backend to persist data.<br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Data persists but there are no separate accounts. People accessing the website would have shared galleries.<br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>It's also the first time I convincingly cloned another website's design.<br/>

<h4>Version 3</h4>
<a href="https://github.com/sangyeonpak/yourmet/tree/master/yourmet-sveltekit" target="_blank">https://github.com/sangyeonpak/yourmet/tree/master/yourmet-sveltekit</a><br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Version 3 is the fully-functioning realized-vision of YourMet.<br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Further, it's written in TypeScript and SvelteKit to use current/trending technologies.<br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>It also uses Auth0 to handle logins to avoid storing sensitive data in YourMet's database.<br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>It has a separate users table to keep track of account customizations.<br/>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>Additional features that were previously unseen in Version 2 are:<br/>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1)&nbsp;&nbsp;</span>2 different view modes: flex and grid<br/>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2)&nbsp;&nbsp;</span>account customization: choosing cover photos and changing user names <br/>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3)&nbsp;&nbsp;</span>account summary (a list snapshot of all the artworks you have displayed/seen) is migrated to the accounts page<br/>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4)&nbsp;&nbsp;</span>no login-demo for people who just want to see the main features<br/>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5)&nbsp;&nbsp;</span>sharing your galleries with the share button<br/>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6)&nbsp;&nbsp;</span>fully mobile friendly<br/>
