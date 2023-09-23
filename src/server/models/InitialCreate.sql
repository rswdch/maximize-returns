create table if not exists "user"
(
    id         uuid      default gen_random_uuid() not null
        primary key,
    username   varchar                             not null,
    role       varchar,
    created_at timestamp default now()             not null
);

alter table "user"
    owner to ryan;

create table if not exists store
(
    id   SERIAL
        primary key,
    name varchar not null
);

alter table store
    owner to ryan;

create table if not exists category
(
    id   SERIAL
        primary key,
    name varchar
);

alter table category
    owner to ryan;

create table if not exists product
(
    id          SERIAL
        primary key,
    category_id integer
        references category,
    name varchar not null
);

alter table product
    owner to ryan;

create table if not exists receipt
(
    id         uuid      default gen_random_uuid() not null
        primary key,
    user_id    uuid
        references "user",
    image_url  varchar,
    created_at timestamp default now() not null
);

alter table receipt
    owner to ryan;

create table if not exists purchase_details
(
    id         uuid      default gen_random_uuid() not null
        primary key,
    purchase_date date    default now() not null,
    product_id    integer               not null
        references product,
    store_id      integer               not null
        references store,
    return_days   integer               not null,
    warranty_days integer               not null,
    price         numeric               not null,
    user_id       uuid                  not null
        references "user",
    receipt_id    uuid
        references receipt,
    returned      boolean default false not null
);

alter table purchase_details
    owner to ryan;


INSERT INTO public.user (username, role) VALUES ('user', 'user');
INSERT INTO public.user (username, role) VALUES ('user2', 'user');

INSERT INTO public.store (name) VALUES ('Costco');

INSERT INTO public.category (name) VALUES ('Electronics');

INSERT INTO public.product (name, category_id)
    SELECT 'iPhone', id FROM public.category c
        WHERE c.name = 'Electronics';

INSERT INTO public.receipt (user_id)
    SELECT id FROM public.user u
        WHERE u.username = 'user';