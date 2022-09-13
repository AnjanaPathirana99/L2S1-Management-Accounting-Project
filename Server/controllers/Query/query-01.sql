
SET GLOBAL log_bin_trust_function_creators = 1;
create table notification(
	not_id int primary key auto_increment,
    product varchar(4),
    fClient varchar(4),
    tClient varchar(4),
    body varchar(255),
    isSeen int,
    constraint fk_noti foreign key (fClient) references user(user_id),
    constraint fk2_noti foreign key (tClient) references user(user_id)
);

drop table notification;
select * from notification;


-- say hello function
DROP function IF EXISTS `printd`;
DELIMITER $$
USE `stockmanager`$$
CREATE FUNCTION printd (pid varchar(4))
RETURNS INTEGER
BEGIN
	declare qnt int;
    select quantity into qnt
    from item 
    where item_code=pid;
RETURN qnt;
END$$
DELIMITER ;

-- update quantity function
DROP function IF EXISTS `updateQnt`;
DELIMITER $$
USE `stockmanager`$$
CREATE FUNCTION updateQnt (i_code varchar(4),i_name varchar(30),c_id varchar(4),s_id varchar(4),q int)
RETURNS INTEGER
BEGIN
	declare qnt int;
    select quantity+q into qnt
    from item
    where (item_code=i_code or item_name=i_name) and customer_id=c_id and supplier_id=s_id limit 1;
    #set qnt=qnt+quantity;
    update item set quantity= qnt
    where (item_code=i_code or item_name=i_name) and customer_id=c_id and supplier_id=s_id limit 1;
RETURN qnt;
END$$
DELIMITER ;


-- sell quantity function
DROP function IF EXISTS `updateQnt`;
DELIMITER $$
USE `stockmanager`$$
CREATE FUNCTION sellQnt (i_code varchar(4),i_name varchar(30),c_id varchar(4),q int)
RETURNS INTEGER
BEGIN
	declare qnt int;
    select quantity-q into qnt
    from item
    where (item_code=i_code or item_name=i_name) and customer_id=c_id limit 1;
    #set qnt=qnt+quantity;
    update item set quantity= qnt
    where (item_code=i_code or item_name=i_name) and customer_id=c_id limit 1;
RETURN qnt;
END$$
DELIMITER ;

delimiter $$
create trigger checkRol
after update
on item for each row
begin
	declare pid varchar(4);
	declare cid varchar(4);
    declare sid varchar(4);
    declare rol int;
    declare eoq int;
    declare qnt int;
	set rol =OLD.rol ;
    set eoq =OLD.eoq ;
    set qnt =NEW.quantity ;
    set sid =OLD.supplier_id ;
    set cid =OLD.customer_id ;
    set pid =OLD.item_code;
    if qnt < rol then
		insert into notification (product,fClient,tClient,body,isSeen) values(pid,cid,sid,"stock near to out",0);
	end if;
end$$
delimiter ;


drop trigger checkRol;



select * from item;
select * from notification;

select printd('P001');
select updateQnt('P001','white sugar','001U','U003',200);
select sellQnt('P002','Brown sugar','001U',100);

use stockmanager;

grant all on item to user_zenith

