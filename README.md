# ScrapeEbaySQL

[Use Supabase with React](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

## start the app

```
npm run dev
```

## install supabase CLI

```
curl -LO https://github.com/supabase/cli/releases/download/{version}/supabase_{version}_linux_amd64.deb
sudo dpkg -i supabase_{version}_linux_amd64.deb
```

## start supabase

```
sudo service docker start
```

```
supabase start
```

## seed data

```
supabse db reset
```

## pull data from remote

```
supabase db pull
```

## crate supabase function

```
supabase functions new your-functions
```

## running supabase function

```
supabase function serve
```

### 参考

[supabase のローカル環境を整える](https://qiita.com/eno49conan/items/4596c1983ee5e3f9e324)
