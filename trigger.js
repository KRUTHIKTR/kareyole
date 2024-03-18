DELIMITER //

CREATE TRIGGER enforce_age_constraint
BEFORE INSERT ON tblblooddonars
FOR EACH ROW
BEGIN
    IF NEW.Age < 18 OR NEW.Age > 65 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Age must be between 18 and 65';
    END IF;
END;
//

DELIMITER ;