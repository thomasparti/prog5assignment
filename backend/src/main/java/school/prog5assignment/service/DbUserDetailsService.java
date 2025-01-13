package school.prog5assignment.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import school.prog5assignment.database.UserRepository;
import school.prog5assignment.entity.UserPrincipal;

@Slf4j
@Service
@RequiredArgsConstructor
public class DbUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = this.userRepository.findByUsernameIs(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + username));

        return new UserPrincipal(user, user.getRoles());
    }
}
