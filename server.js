import jsonServer from 'json-server';
import auth from 'json-server-auth';
import cors from 'cors';

const app = jsonServer.create();
const router = jsonServer.router('db.json');

const rules = auth.rewriter({
  users: 600,
  posts: 660 
});

app.db = router.db;
app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);

app.listen(3000, () => {
  console.log(' JSON Server Auth is running on http://localhost:3000');
});