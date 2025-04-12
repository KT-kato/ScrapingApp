-- ブランドデータ挿入
insert into public.item_bland (bland_name)
values
  ('Apple'),
  ('Sony'),
  ('Canon');

-- モデルデータ挿入
insert into public.item_model (bland_id, bland_model_number)
values
  (1, 'iPhone 13'),
  (1, 'iPhone 14'),
  (2, 'PlayStation 5'),
  (2, 'PlayStation 4'),
  (3, 'EOS R6');

-- 商品詳細データ挿入
insert into public.item_detail (bland_id, model_id, bland_model_number, sold, items)
values
  -- iPhone 13 売れた商品
  (1, 1, 'iPhone 13', true, '[
    { "itemName": "iPhone 13 Blue 128GB", "itemPrice": 750, "itemShippingCost": 20 },
    { "itemName": "iPhone 13 Red 256GB", "itemPrice": 820, "itemShippingCost": 25 }
  ]'::jsonb),

  -- iPhone 13 売れてない商品
  (1, 1, 'iPhone 13', false, '[
    { "itemName": "iPhone 13 White 128GB", "itemPrice": 700, "itemShippingCost": 15 }
  ]'::jsonb),

  -- PS5 売れた商品
  (2, 3, 'PlayStation 5', true, '[
    { "itemName": "PS5 Standard", "itemPrice": 550, "itemShippingCost": 30 }
  ]'::jsonb),

  -- EOS R6 未販売
  (3, 5, 'EOS R6', false, '[
    { "itemName": "Canon EOS R6 Body Only", "itemPrice": 1800, "itemShippingCost": 40 },
    { "itemName": "Canon EOS R6 Kit", "itemPrice": 2200, "itemShippingCost": 50 }
  ]'::jsonb);
