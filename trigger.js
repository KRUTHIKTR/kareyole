DELIMITER $$

CREATE TRIGGER update_num_invitations
AFTER INSERT ON INVITATIONS
FOR EACH ROW
BEGIN
    UPDATE users
    SET num_invitations = (
        SELECT COUNT(*) FROM INVITATIONS
        WHERE user_id = NEW.user_id,
    ) WHERE user_id = NEW.user_id;
END$$

DELIMITER ;
